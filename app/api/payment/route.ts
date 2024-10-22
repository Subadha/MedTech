import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// API route for updating payment status
export const POST = async (req: Request) => {
  try {
    const { amount } = await req.json();
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${new Date().getTime()}`,
    };

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_SECRET!,
    });

    const order = await razorpay.orders.create(options);
    if (order) {
      return NextResponse.json(
        { message: "Success", order: order },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Error" }, { status: 400 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
