import { LoginForm } from "@/components/auth/login-form";
import { LoginUsingOtpForm } from "@/components/auth/login-otp-form";


export default function Login(){
    return(
        <div>
            <LoginForm/>
            {/* <LoginUsingOtpForm/> */}
        </div>
    )
}