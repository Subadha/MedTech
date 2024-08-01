// // components/PhoneAuth.tsx
// import React, { useState } from 'react';
// import { auth } from '@/firebase1'; // Ensure the path is correct
// import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';

// const PhoneAuth: React.FC = () => {
//     const [phoneNumber, setPhoneNumber] = useState<string>('');
//     const [verificationCode, setVerificationCode] = useState<string>('');
//     const [verificationId, setVerificationId] = useState<string>('');

//     const handleSendCode = () => {
//         const recaptchaVerifier = new RecaptchaVerifier('auth', {
//             size: 'invisible',
//         }, auth);

//         signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
//             .then((confirmationResult: ConfirmationResult) => {
//                 setVerificationId(confirmationResult.verificationId);
//             })
//             .catch((error) => {
//                 console.error("Error during sign-in:", error);
//             });
//     };

//     const handleVerifyCode = () => {
//         const credential = PhoneAuthProvider.credential(verificationId, verificationCode);

//         signInWithCredential(auth, credential)
//             .then((userCredential) => {
//                 console.log('User signed in:', userCredential.user);
//             })
//             .catch((error) => {
//                 console.error("Error verifying code:", error);
//             });
//     };

//     return (
//         <div>
//             <input
//                 type="tel"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 placeholder="Enter phone number"
//                 style={{ marginBottom: '10px' }}
//             />
//             <button id="send-code-button" onClick={handleSendCode}>Send Code</button>
//             <input
//                 type="text"
//                 value={verificationCode}
//                 onChange={(e) => setVerificationCode(e.target.value)}
//                 placeholder="Enter verification code"
//                 style={{ marginBottom: '10px', marginTop: '10px' }}
//             />
//             <button onClick={handleVerifyCode}>Verify Code</button>
//         </div>
//     );
// };

// export default PhoneAuth;
