"use server";

import { getServerSession } from "next-auth";
import getAllOrders from "./getAllOrders";

export default async function getCustomerOrders() {
  const session = await getServerSession();
  const myId = session.user.email;
  const orders = await getAllOrders();
  const myorders = orders.flatMap((item) =>
    item.carts.filter((cart) => cart.foodDetails.userId === myId)
  );
  const groupedById = Object.values(
    myorders.reduce((acc, cur) => {
      if (!acc[cur._id]) {
        acc[cur._id] = { _id: cur._id, userId: cur.userId , createdAt:cur.createdAt , items: [] };
      }
      acc[cur._id].items.push({...cur.foodDetails , quantity : cur.quantity});
      return acc;
    }, {})
  );
  return groupedById;
}
