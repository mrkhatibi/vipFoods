"use client"

import { useQuery } from "@tanstack/react-query"
import getCustomerOrders from "./getCustomersOrder"

export default function GetCustomersOrderQuery() {
    const {data , isLoading , refetch} = useQuery({
        queryKey : ["GetCustomersOrderQuery"] ,
        queryFn : getCustomerOrders
    })
    return {data , isLoading , refetch}
}