import img from "@/app/images/p1.png"
import { auth } from "@/auth";
import Profile from "@/components/Profile/Profile";



export default async function ProfilePage() {

    const session = await auth();
    const userName = session?.user.name || "User";
    const email = session?.user.email || "No Email";
    const image = session?.user.image || img;
    const phone = session?.user.phone || "No Number" 

    return (
        <Profile userName = {userName} email={email} image={image} phone={phone}/>
    )
}