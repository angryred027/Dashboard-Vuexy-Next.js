
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { planId } = await req.json();
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
    const plans = await prisma.plan.findMany({
      orderBy: {
        id: 'asc',
      }
    });

    return NextResponse.json(
      {
        success: {
          message: "Fetch data successfully!"
        },
        data: plans,
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
