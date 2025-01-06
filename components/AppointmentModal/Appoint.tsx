"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";
import { MdHealthAndSafety } from "react-icons/md";
import Appoint1 from "./Appoint1";
import Appoint2 from "./Appoint2";
import Appoint3 from "./Appoint3";
import { BookAppointment } from "@/actions/appointment/appoint";
import { useUser } from "@/app/context/userContext";
import logo from "@/app/images/logo.png";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export {};
export default function Appoint({ details }: any) {
  const { id, userName, email, phone } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appointStep, setAppointStep] = useState(0);
  const [appointmentData, setAppointmentData] = useState({
    time: "",
    purpose: "",
    name: "",
    date: "",
    age: null,
    gender: "",
    amount:parseInt(details.doctorProfile?.consultationFees,10),
    doctor_id: details?.id,
    userId: id,
  });
  // Handle the first step (date and time)
  const handleAppoint1Data = (data: any) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      date: data.date,
      time: data.time,
    }));
    setAppointStep(1);
  };

  // Handle the second step (patient details)
  const handleAppoint2Data = (data: any) => {
    setAppointmentData((prevData) => ({
      ...prevData,
      purpose: data.purpose,
      name: data.name,
      age: data.age,
      gender: data.gender,
    }));
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (orderData: any) => {
    //setIsLoading(true);

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please try again.");
      //setIsLoading(false);
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Kaustubha Medtech Private Limited",
      description: "Appointment booking Transaction",
      image: logo,
      order_id: orderData.id,
      handler: async (response: any) => {
        alert(
          `Payment Successful. Razorpay Payment ID: ${response.razorpay_payment_id}`
        );
        try {
          const result = await BookAppointment({...appointmentData,orderId:orderData.id});
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      },
      prefill: {
        name: userName,
        email: email,
        contact: phone,
      },
      notes: {
        address: `${userName} has booked cunsultation with ${details.name} and paid ${orderData.amount} ${orderData.currency}`,
      },
      theme: {
        color: "#5c32d9",
      },
      style: {
        zIndex: 1000,
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Submit the appointment data
  const Submit = async () => {
    try {
      // const result: any = await BookAppointment(appointmentData);
      const result: any = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({amount:appointmentData.amount||1}),
      });
      setDialogOpen(false)
      const {order} = await result.json();
      if (order) {
        const data = await handlePayment(order);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
    }
  };

  // Trigger submission once appointment data is fully filled
  useEffect(() => {
    if (appointStep <= 1 && appointmentData.age&&dialogOpen) {
      Submit();
    }
  }, [appointStep, appointmentData]);

  // Reset form after submission
  const resetAppointmentData = () => {
    setAppointmentData({
      time: "",
      purpose: "",
      name: "",
      date: "",
      age: null,
      amount: parseInt(details.doctorProfile?.consultationFees,10),
      gender: "",
      doctor_id: details?.id,
      userId: id,
    });
    setAppointStep(0);
  };

  const DialogChange = () => {
    setAppointStep(0);
    setDialogOpen(!dialogOpen);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={DialogChange}>
      <DialogTrigger asChild>
        <h2 className="cursor-pointer" onClick={() => setDialogOpen(true)}>
          Consult Online
        </h2>
      </DialogTrigger>
      <DialogOverlay>
        <DialogContent className="p-0 overflow-hidden bg-white">
          <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <MdHealthAndSafety className="mr-2" />
              <span>Appointment</span>
            </div>
          </div>
          <div className="p-4">
            {appointStep === 0 && (
              <Appoint1 details={details} onChangeApp={handleAppoint1Data} />
            )}
            {appointStep === 1 && <Appoint2 onChangeApp={handleAppoint2Data} />}
            {appointStep === 2 && <Appoint3 id={id} />}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
