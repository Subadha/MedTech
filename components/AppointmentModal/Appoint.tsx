"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "../ui/dialog";
import { MdHealthAndSafety } from "react-icons/md";
import Appoint1 from "./Appoint1";
import Appoint2 from "./Appoint2";
import Appoint3 from "./Appoint3";
import { BookAppointment } from "@/actions/appointment/appoint";
import { useUser } from "@/app/context/userContext";

export default function Appoint({ details }: any) {
  const { id } = useUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appointStep, setAppointStep] = useState(0);
  const [appointmentData, setAppointmentData] = useState({
    time: "",
    purpose: "",
    name: "",
    date: "",
    age: null,
    gender: "",
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
    setAppointStep(2); // Move to the final step
  };

  // Submit the appointment data
  const Submit = async () => {
    try {
      const result = await BookAppointment(appointmentData);
      console.log(result);
      // Reset state after submission
      resetAppointmentData();
    } catch (error) {
      console.error("Error booking appointment:", error);
    } finally {
      // Close dialog after submission
      setDialogOpen(false);
    }
  };

  // Trigger submission once appointment data is fully filled
  useEffect(() => {
    if (appointStep === 2 && appointmentData.age) {
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
      gender: "",
      doctor_id: details?.id,
      userId: id,
    });
    setAppointStep(0);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
            {appointStep === 0 && <Appoint1 details={details} onChangeApp={handleAppoint1Data} />}
            {appointStep === 1 && <Appoint2 onChangeApp={handleAppoint2Data} />}
            {appointStep === 2 && <Appoint3 id={id} />}
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
