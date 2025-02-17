
import { NextResponse } from 'next/server'
import { getRedditData } from './api.js';

export async function POST(req) {
  const { subreddit, limit } = await req.json();

  try {
    const data = await getRedditData(subreddit, limit);

    return NextResponse.json(
      {
        success: {
          message: "Fetch data successfully!"
        },
        data: data,
      },
      {
        status: 200,
        statusText: 'OK'
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: 'An unexpected error occurred. \n' + error
        }
      },
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );
  }
}
