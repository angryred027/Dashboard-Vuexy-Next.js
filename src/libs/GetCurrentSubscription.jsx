import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCurrentSubscription = async (userId) => {
  if (!userId) return null;
  const currentSubscription = await prisma.subscription.findFirst({
    where: {
      userId: userId
    },
    include: {
      plan: true,
    },
    orderBy: [
      { status: 'desc' },
      { startDate: 'desc' },
      { endDate: 'desc' },
    ]
  });
  return currentSubscription;
}
