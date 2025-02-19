import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, amount, description } = await req.json();
    console.log(userId, amount, description);
    const now = new Date();

    if (!userId) throw new Error('No user data');

    const transaction = await prisma.transaction.create({
      data: {
        userId,
        description,
        amount: Number.parseFloat(amount),
        status: 'completed',
        transactionDate: now,
        updatedAt: now,
      }
    });

    return NextResponse.json(
      {
        success: {
          message: "Payment successfully!"
        },
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
          message: `An unexpected error occurred. \n${error.message}`
        }
      },
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );
  }
}

// export async function GET(req) {
//   try {
//     const plans = await prisma.plan.findMany({
//       orderBy: {
//         id: 'asc',
//       }
//     });

//     return NextResponse.json(
//       {
//         success: {
//           message: "Fetch data successfully!"
//         },
//         data: plans,
//       },
//       {
//         status: 200,
//         statusText: 'OK'
//       }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         error: {
//           message: `An unexpected error occurred. \n${error.message}`
//         }
//       },
//       {
//         status: 500,
//         statusText: 'Internal Server Error'
//       }
//     );
//   }
// }
