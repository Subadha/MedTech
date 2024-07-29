import {Resend} from "resend"

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

export const sendVerificationEmail = async (
    email:string,
    token:string
) =>{
    const conformLink = `${domain}/auth/new-verification?token=${token}`;
    await resend.emails.send({
        from:"onboarding@resend.dev",   
        to:email,
        subject:"Conform your email",
        html:`<p>Click<a href="${conformLink}"> here </a> to conform mail</p>`
    });
}

// export const sendMobileVerifcation = async (
    
// )