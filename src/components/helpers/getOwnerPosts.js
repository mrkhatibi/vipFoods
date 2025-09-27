"use server"

import { getServerSession } from "next-auth"
import connectDB from "../utils/connectDB"
import VIPFOODS from "@/models/vipFoods"


export default async  function GetOwnerPosts() {
    const session =await getServerSession()
    const id = session.user.email
    await connectDB()
    const posts = await VIPFOODS.find({userId : id})
    return JSON.parse(JSON.stringify(posts))
}