"use server"

import { getServerSession } from "next-auth"
import connectDB from "../utils/connectDB"
import VIPFOODUSERS from "@/models/vipFoodUsers"


export default async function getUser() {
    const session = await getServerSession()
    if (session){
        
        const id = session.user.email
        try {
            await connectDB()
        } catch (error) {
            console.log(error.message)
        }
        const user = await VIPFOODUSERS.findById(id)
        if (user){
            return JSON.parse(JSON.stringify(user))
        }
    }else {
        return null
    }
    
}
export async function getAllUsers() {
  
    
    try {
        await connectDB()
    } catch (error) {
        console.log(error.message)
    }
    const user = await VIPFOODUSERS.find({})
     return JSON.parse(JSON.stringify(user))
    
}