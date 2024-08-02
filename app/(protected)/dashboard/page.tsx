// settings/page.js
import { auth } from "@/auth"; 
import { MainCarausel } from "@/components/dashboard/carausel";
import NearbyDoctors from "@/components/dashboard/nearby-doctors";
import SideNav from "@/components/home/SideNav";

const Settings = async () => {
    const session = await auth(); 
    const userName = session?.user.name || "User";
    const role = session?.user.role || "User";
    return (
        <div className="p-3">
            <MainCarausel/>
            <NearbyDoctors/>
        </div>
    );
}

export default Settings;
