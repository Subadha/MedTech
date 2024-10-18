"use client";
import img from "@/app/images/doc1.png";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Payments({ id }: any) {
  const [payments, setPayments] = useState<any>([]);
  const staticPayments = [
    {
      id: 1,
      payerName: "John Doe",
      amount: 150.0,
      paymentDate: "2024-10-01T12:00:00Z",
      status: "Completed",
      paymentMethod: "Credit Card",
      payerProfilePic: img,
    },
    {
      id: 2,
      payerName: "Jane Smith",
      amount: 200.0,
      paymentDate: "2024-09-15T12:00:00Z",
      status: "Pending",
      paymentMethod: "Bank Transfer",
      payerProfilePic: img,
    },
  ];

//   const getPayments = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_URL}/api/v1/payments/get`,
//         {
//           method: "POST",
//           body: JSON.stringify({ userId: id }),
//         }
//       );
//       const result = await response.json();
//       if (result?.payments.length > 0) {
//         setPayments(result.payments);
//       } else {
//         // Use static payments if no payments are returned from the API
//         setPayments(staticPayments);
//       }
//     } catch (error) {
//       console.log(error);
//       // Use static payments in case of an error
//       setPayments(staticPayments);
//     }
//   };

//   useEffect(() => {
//     getPayments();
//   }, []);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="font-bold text-lg md:text-xl">Payments</h1>
      </div>

      {/* Payment List */}
      {staticPayments.map((payment: any, index: number) => (
        <div key={index} className="flex flex-col">
          <div className="border-2 rounded-lg bg-gray-200">
            <div className="flex flex-col md:flex-row justify-between p-3 items-center">
              <div className="flex items-center mb-3 md:mb-0">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <Image
                    src={payment.payerProfilePic || img}
                    alt="payer"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h1 className="text-sm md:text-md font-semibold">{payment.payerName}</h1>
                  <p className="text-sm md:text-md">Amount: ${payment.amount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-[14px]">
                  {new Date(payment.paymentDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </p>
                {payment.status === "Completed" ? (
                  <CheckCircle className="text-green-500 w-5" />
                ) : (
                  <XCircle className="text-red-500 w-5" />
                )}
              </div>
            </div>
            <div className="px-5 pb-5 w-full md:w-[45vw]">
              <p className="text-sm md:text-md text-gray-700">
                Payment Method: {payment.paymentMethod}
              </p>
              <p className={`text-sm md:text-md ${payment.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                Status: {payment.status}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
