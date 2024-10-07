import { Resend } from "resend";
import nodemailer from "nodemailer";
import { db } from "./db";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

// export const sendPasswordReset= async (
//     email:string,
//     token:string
// ) =>{
//     const resetLink = `${domain}/auth/new-password?token=${token}`;
//     await resend.emails.send({
//         from:"onboarding@resend.dev",
//         to:email,
//         subject:"Reset Your Password",
//         html:`<p>Click<a href="${resetLink}"> here </a> to conform mail</p>`
//     });
// }

export const sendPasswordResetMail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "subadha.co.in@gmail.com",
      pass: "fdqv fzjl zxna qhmp", // Use an app-specific password
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: "onboarding@yourdomain.com",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Your OTP is ${otp}</p>`,
    });

    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email.");
  }
};

export const sendPasswordReset = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "subadha.co.in@gmail.com",
      pass: "fdqv fzjl zxna qhmp", // Use an app-specific password
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: "onboarding@yourdomain.com",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email.");
  }
};

// export const sendVerificationEmail = async (
//     email:string,
//     token:string
// ) =>{
//     const conformLink = `${domain}/auth/new-verification?token=${token}`;
//     await resend.emails.send({
//         from:"onboarding@resend.dev",
//         to:email,
//         subject:"Conform your email",
//         html:`<p>Click<a href="${conformLink}"> here </a> to conform mail</p>`
//     });
// }

export const sendVerificationEmail = async (email: string) => {
  // Create a transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: "subadha.co.in@gmail.com",
      pass: "fdqv fzjl zxna qhmp",
    },
  });

  try {
    await db.emailOtp.deleteMany({
      where: { email },
    });
    const otp = crypto.randomInt(100000, 999999).toString();
    // Send email
    await db.emailOtp.create({
      data: {
        email,
        otp,
        expiry: new Date(Date.now() + 10 * 60 * 1000),
      },
    });

    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: email,
      subject: "OTP for verification",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
      font-size: 24px;
    }
    p {
      color: #555555;
      font-size: 16px;
    }
    .otp {
      font-size: 20px;
      font-weight: bold;
      color: #4CAF50;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #999999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>OTP Verification</h1>
    <p>Your OTP for verification is:</p>
    <p class="otp">${otp}</p>
    <p>Please use this OTP to complete your verification. The code is valid for 10 minutes. If you did not request this OTP, please ignore this email.</p>
    <div class="footer">
      <p>Best regards,<br/>MedTech Team</p>
    </div>
  </div>
</body>
</html>
`,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }
};
