
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function PATCH(req) {
  const { fullName, userName, email, password, telegram } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: {
        fullName: fullName,
        userName: userName,
        email: email,
        password: hashedPassword,
        telegram: telegram,
      }
    });
    if (updatedUser) {
      console.log(updatedUser);
      return NextResponse.json(
        {
          success: {
            message: "Update successfully!"
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
            message: "Update Failed!"
          },
        },
        {
          status: 500,
          statusText: 'Internal Server Error'
        }
      );
    }
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
export async function DELETE(req) {
  try {
    const { email } = await req.json();
    const deletedUser = await prisma.user.delete({
      where: {
        email: email
      }
    });

    if (deletedUser) {
      return NextResponse.json(
        {
          success: {
            message: "Deleting successfully!"
          },
        },
        {
          status: 200,
          statusText: 'OK'
        }
      );
    } else {
      return NextResponse.json(
        {
          error: {
            message: 'Deleting Failed.'
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
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (user) {
      return NextResponse.json(
        {
          success: {
            message: "Fetch data successfully!"
          },
          data: user,
        },
        {
          status: 200,
          statusText: 'OK'
        }
      );
    }
    else{
      return NextResponse.json(
        {
          success: {
            message: "No Registered User!"
          },
          data: null,
        },
        {
          status: 200,
          statusText: 'OK'
        }
      );
    }
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
