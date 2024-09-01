"use server"
import { db } from "@/lib/db";

export const UpdateAbout = async (id:string,about:string)=>{
   try {
     const updatedUser = await db.user.update({
         where: { id: id },
         data: {about:about},
       });
       if(updatedUser){
        return {success:'success'}
       }
   } catch (error) {
    return{error:'error'}
   }

}
export const UpdateProfilePicture = async (id:string,imageUrl:string)=>{
   try {
     const updatedUser = await db.user.update({
         where: { id: id },
         data: {image:imageUrl},
       });
       if(updatedUser){
        return {success:'success'}
       }
   } catch (error) {
    return{error:'error'}
   }

}