"use server"

import VIPCart from "@/models/vipCarts"
import connectDB from "../utils/connectDB"

export default async function getAllOrders() {
    try {
        await connectDB()
    } catch (error) {
        console.log(error.messagee)
    }
    const orders = await VIPCart.find({})
    return JSON.parse(JSON.stringify(orders))
}