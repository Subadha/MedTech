import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import { CONFIRMED, EXPIRED, NOT_CONFIRM } from './constants';

const prisma = new PrismaClient();

// Track consecutive errors to prevent excessive retries
let consecutiveErrors = 0;
const MAX_CONSECUTIVE_ERRORS = 3;

// Helper function to check if error is quota-related
function isQuotaError(error: any): boolean {
  const errorMessage = error?.message || '';
  return errorMessage.includes('compute time quota') || 
         errorMessage.includes('exceeded') ||
         errorMessage.includes('quota');
}

// Cron job to run once per hour (at minute 0) to reduce database load
// Changed from every minute to hourly to prevent quota exhaustion
cron.schedule('0 * * * *', async () => {
  // Skip execution if we've had too many consecutive errors
  if (consecutiveErrors >= MAX_CONSECUTIVE_ERRORS) {
    console.log('Skipping cron job due to too many consecutive errors. Will retry after next successful run.');
    return;
  }

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
    // Reset error counter on success
    consecutiveErrors = 0;
  } catch (error: any) {
    consecutiveErrors++;
    console.error('Error updating expired appointments:', error);
    
    // If it's a quota error, log a warning and skip further attempts
    if (isQuotaError(error)) {
      console.warn('Database quota exceeded. Cron job will be paused until quota is restored.');
      console.warn('Please upgrade your database plan or wait for quota reset.');
    }
  }
});
