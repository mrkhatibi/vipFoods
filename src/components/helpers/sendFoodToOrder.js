"use server";

import VIPORDER from "@/models/vipOrders";
import connectDB from "../utils/connectDB";

export default async function SendFoodToOrder(id, foodDetails) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error.message);
  }

  const exist = await VIPORDER.find({ userId: id  , "foodDetails._id" : foodDetails._id });
  console.log(exist)
  if (exist.length === 0) {
    const newOrder = await VIPORDER.create({
      foodDetails: { ...foodDetails },
      userId: id,
      quantity: 1,
    });
    return JSON.parse(JSON.stringify(newOrder));
  } else {
    const search = exist.filter(
      (item) => item.foodDetails._id === foodDetails._id
    );
    console.log(search)
    const update = await VIPORDER.findOneAndUpdate(
      { _id: search[0]._id },
      { $inc: { quantity: 1 } },
      { new: true }
    );
    console.log(update)
    return JSON.parse(JSON.stringify(update));
  }
}

export async function DecreaseFoodFromOrder(id ,foodDetails) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error.message);
  }

  const exist = await VIPORDER.findOne({ userId: id  , "foodDetails._id" : foodDetails._id });
  if (exist.quantity > 1) {
    const update = await VIPORDER.findOneAndUpdate(
      { _id: exist._id },
      { $inc: { quantity: -1 } },
      { new: true }
    );
    return JSON.parse(JSON.stringify(update));
  } else if (exist.quantity === 1) {
    await VIPORDER.findByIdAndDelete(exist._id);
  }
}
