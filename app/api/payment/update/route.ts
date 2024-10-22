import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// API route for updating payment status
export const POST = async (req: Request) => {
  try {
    const {amount, paymentId, appointmentId, status } = await req.json(); // Extract payment details from request body

    // Validate the input
    if (!paymentId || !appointmentId || !status) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Find the payment record using appointmentId and paymentId
    const paymentRecord = await db.payment.findFirst({
      where: {
        appointmentId: appointmentId,
        paymentId: paymentId,
      },
    });

    // If payment record not found
    if (!paymentRecord) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 });
    }

    // Update payment status
    const updatedPayment = await db.payment.update({
      where: {
        id: paymentRecord.id, 
      },
      data: {
        amount_paid:amount/100,
        paymentStatus: status,
      },
    });

    return NextResponse.json({ message: "Payment updated successfully", updatedPayment });
  } catch (error) {
    console.error("Error updating payment status:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
