// Third-party Imports
import CredentialProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import { getCurrentSubscription } from '@/libs/GetCurrentSubscription'

const prisma = new PrismaClient()

export const prismaAdapter = PrismaAdapter(prisma);

export const getUserByAccount = async (providerAccountId, provider) => {
  const account = await prisma.account.findUnique({
    where: {
      provider: provider,
      providerAccountId: providerAccountId,
    },
    select: {
      user: true,
    },
  });
  return account?.user || null;
};

export const authOptions = {
  adapter: prismaAdapter,

  // ** Configure one or more authentication providers
  // ** Please refer to https://next-auth.js.org/configuration/options#providers for more `providers` options
  providers: [
    CredentialProvider({
      // ** The name to display on the sign in form (e.g. 'Sign in with...')
      // ** For more details on Credentials Provider, visit https://next-auth.js.org/providers/credentials
      name: 'Credentials',
      type: 'credentials',

      /*
       * As we are using our own Sign-in page, we do not need to change
       * username or password attributes manually in following credentials object.
       */
      credentials: {},
      async authorize(credentials) {
        /*
         * You need to provide your own logic here that takes the credentials submitted and returns either
         * an object representing a user or value that is false/null if the credentials are invalid.
         * For e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
         * You can also use the `req` object to obtain additional parameters (i.e., the request IP address)
         */
        const { email, password } = credentials

        try {
          // ** Login API Call to match the user credentials and receive user data in response along with his role
          const res = await fetch(`${process.env.API_URL}/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })

          const data = await res.json()

          if (res.status === 401) {
            throw new Error(JSON.stringify(data))
          }

          if (res.status === 200) {
            /*
             * Please unset all the sensitive information of the user either from API response or before returning
             * user data below. Below return statement will set the user object in the token and the same is set in
             * the session which will be accessible all over the app.
             */
            return data
          }

          return null
        } catch (e) {
          throw new Error(e.message)
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { prompt: 'Select Your Account' } },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { prompt: 'Select Your Account' } },
    }),

    // ** ...add more providers here
  ],

  // ** Please refer to https://next-auth.js.org/configuration/options#session for more `session` options
  session: {
    /*
     * Choose how you want to save the user session.
     * The default is `jwt`, an encrypted JWT (JWE) stored in the session cookie.
     * If you use an `adapter` however, NextAuth default it to `database` instead.
     * You can still force a JWT session by explicitly defining `jwt`.
     * When using `database`, the session cookie will only contain a `sessionToken` value,
     * which is used to look up the session in the database.
     * If you use a custom credentials provider, user accounts will not be persisted in a database by NextAuth.js (even if one is configured).
     * The option to use JSON Web Tokens for session tokens must be enabled to use a custom credentials provider.
     */
    // strategy: 'jwt',
    strategy: 'jwt',


    // ** Seconds - How long until an idle session expires and is no longer valid
    maxAge: 30 * 24 * 60 * 60 // ** 30 days
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#pages for more `pages` options
  pages: {
    signIn: '/login'
  },

  // ** Please refer to https://next-auth.js.org/configuration/options#callbacks for more `callbacks` options
  callbacks: {
    /*
     * While using `jwt` as a strategy, `jwt()` callback will be called before
     * the `session()` callback. So we have to add custom parameters in `token`
     * via `jwt()` callback to make them accessible in the `session()` callback
     */
    async jwt({ token, user }) {
      if (user) {
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the `session()` callback
         */
        const getSubscription = async (user) => {
          if (user?.role !== 'user') return null;
          const userId = user.id;
          const currentSubscription = await getCurrentSubscription(userId);
          console.log("Current Subscription", currentSubscription);
          if (!currentSubscription) return null;
          const endDate = new Date(currentSubscription.endDate);
          const now = new Date();
          const status = (now > endDate) ? 'expired' : currentSubscription.status;
          if (now > endDate && currentSubscription.status !== 'expired') {
            await prisma.subscription.update({
              where: { id: currentSubscription.id },
              data: { status: 'expired' },
            });
          }

          return { status, planId: currentSubscription.planId };
        };

        const subscription = await getSubscription(user);
        token = { ...token, id: user.id, role: user.role, subscription };
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in `jwt()` callback via `token` parameter
        // session.user.name = token.name
        // session.user.id = token.id
        // session.user.role = token.role
        // session.user.subscription = token.subscription;
        session.user = {
          ...session.user, id: token.id,
          role: token.role, subscription: token.subscription,
        }
      }

      return session
    },

    async signIn({ user, account, profile }) {
      // Check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: { accounts: true },
      });

      // If the user doesn't exist, create a new user in the database
      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            userName: user.name,
            fullName: user.name,
            image: user.image,
            accounts: {
              create: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
              },
            },
          },
        });
      } else if (existingUser && existingUser.accounts.find((acc) => {
        acc.provider === account.provider
      })) {
        const existingAccount = existingUser.accounts.find(
          (acc) => acc.provider === account.provider
        );
        // Optionally, update the provider if it differs from the current provider.
        if (!existingAccount) {
          // Link new provider account if not already linked
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
            },
          });
        }
      }

      return true;
    },

  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debugging
  allowDangerousEmailAccountLinking: true,
};
