import {auth, signOut} from "@/auth";

const Settings = async ()=>{
    const session = await auth();
    return(
        <div>
            {JSON.stringify(session?.user.name)}
            <form action={async ()=>{
                "use server";
                await signOut();
            }}>
                <button type="submit">
                    Sign Out
                </button>
            </form>
        </div>
    )
}

export default Settings;