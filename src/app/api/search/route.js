
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const { subreddit, limit } = await req.json();

    const externalApiUrl =
      `http://49.13.193.48:5000/lowest_karma?subreddit=${subreddit}&limit=${limit}`;

    console.log(externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Invalid input or request data.' },
        { status: 400 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
