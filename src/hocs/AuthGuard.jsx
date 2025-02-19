// Third-party Imports
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
// Component Imports
import AuthRedirect from '@/components/AuthRedirect'
import RoleRedirect from '@/components/RoleRedirect';
import SubRedirect from '@/components/SubRedirect';

export default async function AuthGuard({ children, locale }) {
  const session = await getServerSession(authOptions)
  // const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  if (!session) return <AuthRedirect lang={locale} />

  const user = session.user;
  // const role = user.role;

  // if (role !== 'admin' && pathname.startsWith("/admin")) {
  //   return <RoleRedirect lang={locale} />
  // }

  // const subscription = user.subscription;
  // if (pathname !== '/subscription' && (!subscription || subscription?.status === 'expired')) {
  //   return <SubRedirect lang={locale} />
  // }

  return <>{children}</>
}
