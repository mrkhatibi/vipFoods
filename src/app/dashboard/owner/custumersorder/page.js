"use client";

import GetCustomersOrderQuery from "@/components/helpers/getCustomersOrdersQuery";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import Loader from "@/components/modules/loader/Loader";
import CustomersCard from "@/components/templates/CustomersCard";
import { redirect } from "next/navigation";


function CustomerOrders() { 
  const {data : userData , isLoading : userLoading} = GetUserDataQuery()
  if (userLoading) return <Loader />;
   if (!userData) {
      redirect("/");
    }
    if (userData.role !== "OWNER") {
      redirect("/");
    }

  const { data, isLoading } = GetCustomersOrderQuery();
  if (isLoading) return <Loader />;

  return <div>
    {data.map(item=>(
        <CustomersCard key={item._id} item={item}/>
    ))}
  </div>;
}

export default CustomerOrders;
