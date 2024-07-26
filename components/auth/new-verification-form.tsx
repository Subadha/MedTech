"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-warpper";
import { BeatLoader } from 'react-spinners';
import { Suspense, useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";

const VerificationProcess = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(() => {
        if (success || error) return;

        if (!token) {
            setError('Missing Token');
            return;
        }

        newVerification(token)
            .then((data) => {
                setSuccess(data.sucess);
                setError(data.error);
            })
            .catch(() => {
                setError("Something went wrong");
            });
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <div className="flex items-center w-full justify-center">
            {!success && !error && <BeatLoader />}
            {success && !error && <p>Success</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default function NewVerificationForm() {
    return (
        <Suspense fallback={<BeatLoader />}>
            <CardWrapper
                headerTitle="Verification"
                headerLabel="Confirm Your Verification"
                backButtonLabel="Back to Login"
                backButtonHref="/auth/login"
            >
                <VerificationProcess />
            </CardWrapper>
        </Suspense>
    );
}
