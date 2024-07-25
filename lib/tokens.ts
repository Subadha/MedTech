import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "@/data/verificationtoken";
import { db } from "@/lib/db";
import { getPasswordResetTokenByEmail } from "@/data/password-resset-token";

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await db.passwordReset.delete({
            where: { id: existingToken.id },
        });
    }

    const passwordReset = await db.passwordReset.create({
        data: {
            email,
            token,
            expires,
        },
    });

    return passwordReset;
};

export const getVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000); // 1 hour from now
    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    });
    return verificationToken;
};
