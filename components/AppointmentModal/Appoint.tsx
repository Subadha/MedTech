"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from "../ui/dialog";
import { MdHealthAndSafety } from "react-icons/md";
import Appoint1 from "./Appoint1";
import Appoint2 from "./Appoint2";
import Appoint3 from "./Appoint3";

export default function Appoint({ details,user }: any){

    const [dialogOpen, setDialogOpen] = useState(false);
    const [appoint,setAppoint] = useState(0);

    function onAppointment(){
        setAppoint(1);
    }
    function onAppointment1() {
        setAppoint(2);
    }

    return(
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <button onClick={() => setDialogOpen(true)}>Consult Online</button>
            </DialogTrigger>
            <DialogOverlay>
                <DialogContent className="p-0 overflow-hidden bg-white">
                    <div className="bg-purple-700 text-white p-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <MdHealthAndSafety />
                                <span className="ml-4">Appointment</span>
                            </div>
                            <div className="pr-5">
                                <span>800 Fees</span>
                            </div>
                        </div>
                    </div> 
                    {appoint === 0 && <Appoint1 details={details} onChangeApp = {onAppointment}/>}
                    {appoint === 1 && <Appoint2 onChangeApp={onAppointment1} />}
                    {appoint===2 && <Appoint3 user={user}/>}
                </DialogContent>
        </DialogOverlay>
        </Dialog >
    )
}