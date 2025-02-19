import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from "next/headers";
import { JsonWebTokenError } from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const data = await req.json();
    const user = JSON.parse(data.user);
    const plan = JSON.parse(data.plan);
    // const plan = subData.plan;
    console.log(user, plan);
    if (!user || !plan) {
      throw new Error('No User Data or Plan Data');
    }

    const userId = user.id;
    const planId = plan.id;
    const durationDays = Number.parseInt(plan.durationDays, 10);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);

    const exist = await prisma.subscription.findFirst({
      where: {
        userId: userId
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    let subscription = null;
    if (exist) {
      subscription = await prisma.subscription.update({
        where: {
          userId: userId,
        },
        data: {
          status: "active",
          planId: planId,
          startDate: startDate,
          endDate: endDate,
          updatedAt: startDate,
        },
      });
    }
    else {
      // Create new subscription in the database
      subscription = await prisma.subscription.create({
        data: {
          userId: userId,
          status: "active",
          planId: planId,
          startDate: startDate,
          endDate: endDate,
          updatedAt: startDate,
        },
      });
    }

    if (!subscription) {
      return NextResponse.json(
        {
          error: { message: 'An unexpected error occurred while updating the subscription.' },
        },
        { status: 500 }
      );
    }
    else {
      console.log("Updated!!!!!!!!!!!!!!!!!!!!!!!!")
    }

    // Retrieve and parse session data safely
    let session = cookies().get("session")?.value;
    let sessionData;

    try {
      sessionData = session && session.trim() ? JSON.parse(session) : {};
    } catch (error) {
      console.error("Error parsing session data:", error);
      sessionData = {}; // Default to empty object on parse failure
    }

    // Ensure sessionData has a valid user object
    if (!sessionData.user || typeof sessionData.user !== "object") {
      sessionData.user = {};
    }

    // Update session user subscription data
    sessionData.user.subscription = {
      status: "active",
      planId: planId,
    };

    // Set the updated session in the cookie
    const response = NextResponse.json(
      {
        success: { message: 'Subscription updated!', session: sessionData },
      },
      { status: 200 }
    );

    response.cookies.set("session", JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: { message: 'An unexpected error occurred. \n' + error.message },
      },
      { status: 500 }
    );
  }
}
