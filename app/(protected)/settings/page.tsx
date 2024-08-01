// settings/page.js
import { auth } from "@/auth"; 
import SideNav from "@/components/home/SideNav";

const Settings = async () => {
    const session = await auth(); 
    const userName = session?.user.name || "User";
    const role = session?.user.role || "User";
    return (
        <div>
            <h1>Dashboard</h1>
            {/* <SideNav userName={userName} role={role}/> */}
        </div>
    );
}

export default Settings;
