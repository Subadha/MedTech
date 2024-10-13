import { GetCommunityConversations } from "@/actions/chat/GetCommunityConversations"
import { NextResponse } from "next/server"

export const POST =async(req:any)=>{
    try {
    const {userId}= await req.json()
       const data= await GetCommunityConversations(userId)
       return NextResponse.json({success:"Fetched",data:data})
    } catch (error) {
        console.log(error);
      return NextResponse.json({error:"Internal Server Error"})
    }
}