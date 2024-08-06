import { MainCarausel } from "@/components/dashboard/carausel";
import NearbyDoctors from "@/components/dashboard/nearby-doctors";
import RecommendedDoctors from "@/components/dashboard/recommended-doctor";
import UpcomingAppointments from "@/components/dashboard/upcoming-appointments";

const Settings = async () => {
 
    return (
        <div className="p-3 grid gap-4 grid-cols-6">
           <div className=" col-span-6 lg:col-span-4">
           <MainCarausel/>
           <NearbyDoctors/>
           </div>
            <UpcomingAppointments/>
            <RecommendedDoctors/>
        </div>
    );
}

export default Settings;


