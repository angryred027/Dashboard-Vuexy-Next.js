import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentSubscription } from '@/libs/GetCurrentSubscription'
import { cookies } from "next/headers";
import { JsonWebTokenError } from 'jsonwebtoken';

const prisma = new PrismaClient();
let currentSubscription = null;
const determineAction = async (user, plan) => {
  if (!user || !plan) return 'noAction';
  const planId = plan.id;
  const userId = user.id;
  currentSubscription = await getCurrentSubscription(user.id);
  if (!currentSubscription) return 'start';
  else {
    if (currentSubscription.status === 'expired') {
      if (currentSubscription.planId === planId) return 'renew';
      else return 'update';
    }
    else {
      if (currentSubscription.planId !== planId) return 'update';
      else return 'noAction';
    }
  }
}

export async function POST(req) {
  try {
    const { user, plan } = await req.json();
    console.log(user, plan);
    if (!user || !plan) {
      throw new Error('No User Data or Plan Data');
    }

    const actionType = determineAction(user, plan);
    switch(actionType){
      case 'start':
        break;
      case 'renew':
        break;
      case 'update':
        break;
      default:
        break;
    }

    const userId = user.id;
    const planId = plan.id;
    const durationDays = Number.parseInt(plan.durationDays, 10);
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + durationDays);


    return NextResponse.json(
      {
        success: { message: 'Subscription Updated!' },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: { message: error.message },
      },
      { status: 500 }
    );
  }
}

const startSubscription = async (user, plan) => {
  
}











































// const exist = await prisma.subscription.findFirst({
//   where: {
//     userId: userId
//   },
//   orderBy: {
//     updatedAt: 'desc'
//   }
// });

// let subscription = null;
// if (exist) {
//   subscription = await prisma.subscription.update({
//     where: {
//       userId: userId,
//       planId: planId,
//     },
//     data: {
//       status: "active",
//       planId: planId,
//       startDate: startDate,
//       endDate: endDate,
//       updatedAt: startDate,
//     },
//   });
// }
// else {
//   // Create new subscription in the database
//   subscription = await prisma.subscription.create({
//     data: {
//       userId: userId,
//       status: "active",
//       planId: planId,
//       startDate: startDate,
//       endDate: endDate,
//       updatedAt: startDate,
//     },
//   });
// }

// if (!subscription) {
//   return NextResponse.json(
//     {
//       error: { message: 'An unexpected error occurred while updating the subscription.' },
//     },
//     { status: 500 }
//   );
// }
// else {
//   console.log("Updated!!!!!!!!!!!!!!!!!!!!!!!!")
// }

// // Retrieve and parse session data safely
// let session = cookies().get("session")?.value;
// let sessionData;

// try {
//   sessionData = session && session.trim() ? JSON.parse(session) : {};
// } catch (error) {
//   console.error("Error parsing session data:", error);
//   sessionData = {}; // Default to empty object on parse failure
// }

// // Ensure sessionData has a valid user object
// if (!sessionData.user || typeof sessionData.user !== "object") {
//   sessionData.user = {};
// }

// // Update session user subscription data
// sessionData.user.subscription = {
//   status: "active",
//   planId: planId,
// };

// // Set the updated session in the cookie
// const response = NextResponse.json(
//   {
//     success: { message: 'Subscription updated!', session: sessionData },
//   },
//   { status: 200 }
// );

// response.cookies.set("session", JSON.stringify(sessionData), {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
//   maxAge: 60 * 60 * 24 * 30, // 30 days
//   path: "/",
// });

// return response;
//   } catch (error) {
//   console.error(error);
//   return NextResponse.json(
//     {
//       error: { message: 'An unexpected error occurred. \n' + error.message },
//     },
//     { status: 500 }
//   );
// }
// }
