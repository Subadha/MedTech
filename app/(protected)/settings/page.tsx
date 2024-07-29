// settings/page.js
import { auth } from "@/auth"; 
import SideNav from "@/components/home/SideNav";

const Settings = async () => {
    const session = await auth(); 
    const userName = session?.user.name || "User";
    const role = session?.user.role || "User";
    return (
        <div>
            <SideNav userName={userName} role={role}/>
        </div>
    );
}

export default Settings;
