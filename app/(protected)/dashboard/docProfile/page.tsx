import { auth } from "@/auth";
import DocProfile from "@/components/Doctor/DocProfile/DocProfile";



export default async function DocPage() {

    const session = await auth();
    const doc = session?.user

    

    return (
        <DocProfile doc={doc}/>
    )
}