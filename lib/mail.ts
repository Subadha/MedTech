import {Resend} from "resend"
import nodemailer from "nodemailer";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_URL;

export const sendPasswordReset= async (
    email:string,
    token:string
) =>{
    const resetLink = `${domain}/auth/new-password?token=${token}`;
    await resend.emails.send({
        from:"onboarding@resend.dev",   
        to:email,
        subject:"Reset Your Password",
        html:`<p>Click<a href="${resetLink}"> here </a> to conform mail</p>`
    });
}

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

export const sendVerificationEmail = async (email:string, token:string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

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
    // Send email
    await transporter.sendMail({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Confirm your email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
    });

    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email.");
  }

}
