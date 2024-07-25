"use client";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-warpper";
import {BeatLoader} from 'react-spinners'
import { useCallback, useEffect,useState } from "react";
import { newVerification } from "@/actions/new-verification";

export default function NewVerificationForm() {

    const [error,setError] = useState<string| undefined>();
    const [sucess, setSucess] = useState<string | undefined>();
    const searchParams = useSearchParams();

    const token = searchParams.get("token");

    const onSubmit = useCallback(()=>{

        if(sucess || error){
            return;
        }

        if(!token){
            setError('Missing Token');
            return;
        }
        newVerification(token)
        .then((data)=>{
            setSucess(data.sucess)
            setError(data.error);
        })
        .catch(()=>{
            setError("Something went Wrong")
        })
    },[token,sucess,error]);


    useEffect(()=>{
        onSubmit()
    },[onSubmit])

    return (
        <CardWrapper 
        headerLabel="Conform Your Verification"
        backButtonLabel="back to Login"
        backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                {!sucess && !error && (<BeatLoader/>)}
                {sucess && !error && <p>Sucess</p>}
                {!sucess &&  <p>Error</p> }
            </div>  
        </CardWrapper>
    )
}