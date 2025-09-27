"use server"

import VIPFOODS from "@/models/vipFoods";
import connectDB from "../utils/connectDB";



export default async function GetAllFoods() {
    try {
        await connectDB()
    } catch (error) {
        console.log(error.message)
    }
    const allFoods = await VIPFOODS.find({}).sort({ createdAt: 1 });
    return JSON.parse(JSON.stringify(allFoods))
}