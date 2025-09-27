"use server"

import VIPFOODS from "@/models/vipFoods"
import connectDB from "../utils/connectDB"


export default async function SearchFood(name) {
    if (!name) return
    try {
        await connectDB()
    } catch (error) {
        console.log(error.message)
    }

    const result = await VIPFOODS.find({
        name : {$regex : name , $options : "i"}
    })
    return JSON.parse(JSON.stringify(result))
}