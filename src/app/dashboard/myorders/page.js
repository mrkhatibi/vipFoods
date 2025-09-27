"use client";

import GetAllOrdersQuery from "@/components/helpers/getAllOrdersQuery";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import MyOrderCard from "@/components/modules/MyOrderCard";
import styles from "./myOrders.module.css"
import Loader from "@/components/modules/loader/Loader";
function MyOrders() {
  const { data, isLoading, refetch } = GetAllOrdersQuery();
  const { data: userData, isLoading: userLoading } = GetUserDataQuery();

  if (isLoading) return <Loader />;
  if (userLoading) return <Loader />;
if (!userData){
    redirect("/signin")
  }
  const userOrders = data.filter((item) => item.userId === userData._id);
  return (
    <div >
      <h3 className={styles.title}>My Orders</h3>
      {userOrders.map((item) => (
        <MyOrderCard key={item._id} item={item}/>
      ))}
    </div>
  );
}

export default MyOrders;
