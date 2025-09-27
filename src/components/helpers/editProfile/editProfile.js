"use server"

import connectDB from "@/components/utils/connectDB"
import VIPFOODUSERS from "@/models/vipFoodUsers"



export default async function editProfile(id , address , number , resturantName , resturantType) {
    try {
        await connectDB()
        const user = await VIPFOODUSERS.findByIdAndUpdate(id , {address , number , resturantName , resturantType})
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        console.log(error.message)
    }

}