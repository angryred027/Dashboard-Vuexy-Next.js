import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

function loadTokens() {
  const data = fs.readFileSync('tokens.json');
  return JSON.parse(data).tokens;
}

function getRandomToken(tokens) {
  return tokens[Math.floor(Math.random() * tokens.length)];
}

function convertUnixToDate(unixTimestamp) {
  const milliseconds = unixTimestamp * 1000;
  return new Date(milliseconds);
}

export async function getRedditData(subreddit, limit = 50) {
  const tokens = loadTokens();
  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    const token = getRandomToken(tokens);

    const clientId = token.client_id;
    const clientSecret = token.client_secret;
    const userAgent = token.user_agent;

    console.log(`Intento ${attempt}: Usando user_agent: ${userAgent}`);

    try {
      // Autenticación con la API de Reddit
      const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
      const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'User-Agent': userAgent,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData.access_token;

      // Obtener información del subreddit
      const subredditResponse = await fetch(`https://oauth.reddit.com/r/${subreddit}/about`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': userAgent
        }
      });

      const subredditData = await subredditResponse.json();
      const isNsfw = subredditData.data.over18;
      const numMembers = subredditData.data.subscribers;

      // Obtener las publicaciones más recientes del subreddit
      const postsResponse = await fetch(`https://oauth.reddit.com/r/${subreddit}/new?limit=${limit}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': userAgent
        }
      });

      const postsData = await postsResponse.json();
      const posts = postsData.data.children;

      let lowestLinkKarmaPost = null;
      let lowestLinkKarma = Infinity;
      let lowestLinkKarmaUserUrl = "";

      let lowestCommentKarmaUser = null;
      let lowestCommentKarma = Infinity;
      let lowestCommentKarmaUserUrl = "";

      let mostRecentUser = null;
      let mostRecentUserDaysSinceRegistration = Infinity;
      let mostRecentUserTimestamp = null;
      let mostRecentUserUrl = "";

      for (const post of posts) {
        try {
          const postData = post.data;
          const author = postData.author;

          // Obtener información del usuario
          const userResponse = await fetch(`https://oauth.reddit.com/user/${author}/about`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'User-Agent': userAgent
            }
          });

          const userData = await userResponse.json();
          const user = userData.data;

          if (!user) {
            console.log(`Usuario ${author} omitido porque no tiene datos disponibles.`);
            continue;
          }

          const userLinkKarma = user.link_karma;
          const userCommentKarma = user.comment_karma;
          const userCreatedUtc = user.created_utc;
          const userUrl = `https://www.reddit.com/user/${author}/`;

          // Comparar link karma (karma de publicaciones)
          if (userLinkKarma < lowestLinkKarma) {
            lowestLinkKarma = userLinkKarma;
            lowestLinkKarmaPost = postData;
            lowestLinkKarmaUserUrl = userUrl;
          }

          // Comparar comment karma (karma de comentarios)
          if (userCommentKarma < lowestCommentKarma) {
            lowestCommentKarma = userCommentKarma;
            lowestCommentKarmaUser = user;
            lowestCommentKarmaUserUrl = userUrl;
          }

          // Comparar la fecha de registro del usuario (más reciente)
          const daysSinceRegistration = (Date.now() / 1000 - userCreatedUtc) / 86400;
          if (daysSinceRegistration < mostRecentUserDaysSinceRegistration) {
            mostRecentUserDaysSinceRegistration = daysSinceRegistration;
            mostRecentUser = user;
            mostRecentUserTimestamp = userCreatedUtc;
            mostRecentUserUrl = userUrl;
          }
        } catch (error) {
          console.log(`Error al obtener la información del usuario: ${error}`);
          continue;
        }
      }

      // Preparar el resultado en un objeto
      const result = {
        subreddit: subreddit,
        lowest_link_karma_post: {
          title: lowestLinkKarmaPost ? lowestLinkKarmaPost.title : null,
          link_karma: lowestLinkKarma,
          post_url: lowestLinkKarmaPost ? `https://www.reddit.com${lowestLinkKarmaPost.permalink}` : null,
          user_url: lowestLinkKarmaUserUrl,
          nsfw_status: lowestLinkKarmaPost ? (lowestLinkKarmaPost.over_18 ? "NSFW" : "SFW") : null
        },
        lowest_comment_karma_user: {
          username: lowestCommentKarmaUser ? lowestCommentKarmaUser.name : null,
          comment_karma: lowestCommentKarma,
          user_url: lowestCommentKarmaUserUrl
        },
        most_recent_user: {
          username: mostRecentUser ? mostRecentUser.name : null,
          days_since_registration: mostRecentUserDaysSinceRegistration,
          registration_timestamp: mostRecentUserTimestamp,
          user_url: mostRecentUserUrl
        },
        is_nsfw: isNsfw,
        num_members: numMembers
      };
      // console.log(JSON.stringify(result, null, 2));
      return JSON.stringify(result, null, 2);
    } catch (error) {
      console.log(`Error en el intento ${attempt}: ${error}`);
      if (attempt >= maxRetries) {
        throw error;
      } else {
        console.log("Reintentando con un token diferente...");
      }
    }
  }
}

// Llamar a la función con el subreddit deseado

