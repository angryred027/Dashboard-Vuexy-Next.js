// Next Imports
import { NextResponse } from 'next/server'

// Mock data for demo purpose
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {

  // Vars
  const { email, password } = await req.json()

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  });

  if (user && user.password) {

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: {
            password: {
              message: 'Password is incorrect!',
            }
          }
        },
        {
          status: 401,
          statusText: 'Unauthorized'
        }
      )
    }

    let response = null;
    const { password: _, ...filteredUserData } = user
    response = {
      ...filteredUserData
    }
    return NextResponse.json(response);
  } else {
    return NextResponse.json(
      {
        error: {
          email: {
            message: 'Email is not exist',
          }
        }
      },
      {
        status: 401,
        statusText: 'Unauthorized'
      }
    )
  }
}
