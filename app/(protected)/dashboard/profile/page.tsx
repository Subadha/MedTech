import { auth } from "@/auth";
import Profile from "@/components/Profile/Profile";



export default async function ProfilePage() {

    const session = await auth();
    const id = session?.user.id 

    return (
        <Profile id={id}/>
    )
}