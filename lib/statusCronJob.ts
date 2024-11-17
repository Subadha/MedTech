import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { CONFIRMED, EXPIRED, NOT_CONFIRM } from './constants';

const prisma = new PrismaClient();

// Cron job to run every day at midnight
cron.schedule('* * * * *', async () => {
  console.log('Running cron job to update expired appointments...');
  const now = new Date();
  try {
    const result = await prisma.bookedAppointment.updateMany({
      where: {
        date: {
          lt: now, // Less than current date
        },
        status: {
          in: [NOT_CONFIRM, CONFIRMED], // Only target these statuses
        },
      },
      data: {
        status: EXPIRED,
      },
    });

    console.log(`Updated ${result.count} appointments to expired.`);
  } catch (error) {
    console.error('Error updating expired appointments:', error);
  }
});
