
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { id, content } = await req.json();
  try {
    //
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

export async function GET(req) {

  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: {
        updatedAt: 'asc',
      }
    });

    return NextResponse.json(
      {
        success: {
          message: "Fetch data successfully!"
        },
        data: faqs,
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
