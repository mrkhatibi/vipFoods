"use server";

import VIPCart from "@/models/vipCarts";
import connectDB from "../utils/connectDB";
import VIPORDER from "@/models/vipOrders";

export default async function SendOrderstoCart(id, userCart) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error.message);
  }
  const newCart = await VIPCart.create({ userId: id, carts: userCart });
  const deleteOrders = await VIPORDER.deleteMany({userId : id})
  return JSON.parse(JSON.stringify(newCart));
}
