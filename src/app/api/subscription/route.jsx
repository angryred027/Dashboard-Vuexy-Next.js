import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getCurrentSubscription } from '@/libs/GetCurrentSubscription';

const prisma = new PrismaClient();

let currentSubscription = null;

const determineAction = async (user, plan) => {
  if (!user || !plan) return 'noAction';
  const { id: planId } = plan;
  const { id: userId } = user;
  currentSubscription = await getCurrentSubscription(userId);

  if (!currentSubscription) return 'start';
  if (currentSubscription.status === 'expired') {
    return currentSubscription.planId === planId ? 'renew' : 'update';
  }
  return currentSubscription.planId !== planId ? 'update' : 'noAction';
};

const calculateDates = (durationDays) => {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + parseInt(durationDays, 10));
  return { startDate, endDate };
};

const respond = (success, message, status = 200) =>
  NextResponse.json(
    success ? { success: { message } } : { error: { message } },
    { status }
  );

const handleSubscription = async (action, user, plan) => {
  const { id: userId } = user;
  const { id: planId, durationDays } = plan;
  const { startDate, endDate } = calculateDates(durationDays);

  switch (action) {
    case 'start':
      return prisma.subscription.create({
        data: { userId, planId, status: 'active', startDate, endDate, updatedAt: startDate },
      })
        .then(() => respond(true, 'Subscription Started!'))
        .catch((err) => respond(false, `Subscription Failed!\n${err.message}`, 500));

    case 'renew':
      return prisma.subscription.update({
        where: { id: currentSubscription.id, userId },
        data: { status: 'active', startDate, endDate, updatedAt: startDate },
      })
        .then(() => respond(true, 'Subscription Renewed!'))
        .catch((err) => respond(false, `Subscription Failed!\n${err.message}`, 500));

    case 'update':
      return prisma.subscription.delete({ where: { id: currentSubscription.id, userId } })
        .then(() => prisma.subscription.create({
          data: { userId, planId, status: 'active', startDate, endDate, updatedAt: startDate },
        }))
        .then(() => respond(true, 'Subscription Updated!'))
        .catch((err) => respond(false, `Subscription Failed!\n${err.message}`, 500));

    default:
      return respond(true, 'You already use this plan!');
  }
};


export async function POST(req) {
  try {
    const { user, plan } = await req.json();
    if (!user || !plan) throw new Error('No User Data or Plan Data');

    const action = await determineAction(user, plan);
    return handleSubscription(action, user, plan);
  } catch (error) {
    return respond(false, error.message, 500);
  }
}
