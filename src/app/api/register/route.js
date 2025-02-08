// Next Imports
import { NextResponse } from 'next/server'

// Mock data for demo purpose
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
require('dotenv').config();

export async function POST(req) {
  // Vars
  const { fullName, userName, email, password, telegram} = await req.json()
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    }
  })

  if (user) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 300 });
  }
  else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCreatedUser = await prisma.user.create({
        data: {
          userName: userName,
          fullName: fullName,
          email: email,
          password: hashedPassword,
          telegram: telegram,
        }
      });

      if(newCreatedUser){
        return NextResponse.json({ message: 'Registered Successfully!' }, { status: 200 });
      }
      else{
        return NextResponse.json({ message: 'Registered Failed!' }, { status: 400 });
      }
    } catch (error) {
        return NextResponse.json({ message: 'Register Failed: ' + error }, { status: 400 });
    }
  }
}
