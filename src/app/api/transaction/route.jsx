
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { userId, description, amount, status, } = await req.json();
  try {
    //
    const now = new Date();
    const transaction = await prisma.transaction.create({
      data: {
        userId: userId,
        description: description,
        amount: Number.parseFloat(amount),
        status: "pending",
        transactionDate: now,
        updatedAt: now,
      }
    });
    if (transaction) {
      return NextResponse.json(
        {
          success: {
            message: "Transaction success!"
          },
        },
        {
          status: 200,
          statusText: 'OK'
        }
      );
    }
    else {
      return NextResponse.json(
        {
          error: {
            message: 'An unexpected error occurred. \n'
          }
        },
        {
          status: 500,
          statusText: 'Internal Server Error'
        }
      );
    }
  } catch (error) {
    console.log(error);
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
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      }
    });

    return NextResponse.json(
      {
        success: {
          message: "Fetch data successfully!"
        },
        data: transactions,
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
