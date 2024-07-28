// settings/page.js
import { auth } from "@/auth"; // Import the server action
import SideNav from "@/components/home/SideNav";

const Settings = async () => {
    const session = await auth(); // Fetch user session data
    const userName = session?.user.name || "User"; // Default to "User" if name is not available

    return (
        <div>
            <SideNav userName={userName} />
        </div>
    );
}

export default Settings;
