"use server"

import VIPORDER from "@/models/vipOrders"
import connectDB from "../utils/connectDB"


export default async function GetOrder() {
    try {
        await connectDB()
    } catch (error) {
        console.log(error.message)
    }
    const order = await VIPORDER.find({})
    return JSON.parse(JSON.stringify(order))
}