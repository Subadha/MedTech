import {db} from "@/lib/db"

export const getUserByEmail = async (email:string)=>{
    try{
        const user = await db.user.findUnique({
            where :{
                email
            }
        })
        return user;
    }catch{
        return null;
    }
}


export const getUserByNumber = async (phone: string) => {
    try {
        const user = await db.user.findUnique({
            where: { phone},
        });
        return user;
    } catch (error) {
        console.error('Error fetching user by phone number:', error);
        return null;
    }
};


export const getUserById = async (id:string | undefined)=>{
    try{
        const user = await db.user.findUnique({
            where :{
                id
            }
        })
        return user;
    }catch{
        return null;
    }
}