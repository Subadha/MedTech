// pages/api/appoint.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, phone, date } = req.body;

    try {
      // Save appointment data to the database
      const appointment = await prisma.appointment.create({
        data: {
          email,
          phone,
          date: new Date(date), // Ensure the date is in the correct format
        },
      });

      res.status(201).json({ success: true, appointment });
    } catch (error) {
      console.error("Error saving appointment:", error);
      res.status(500).json({ error: "Failed to save appointment" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
