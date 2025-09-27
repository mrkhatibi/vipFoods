"use client"

import { useQuery } from "@tanstack/react-query"
import getAllOrders from "./getAllOrders"


export default function GetAllOrdersQuery() {
    const {data , isLoading , refetch} = useQuery({
        queryKey : ["getAllOrders"] ,
        queryFn : getAllOrders
    })
    return {data , isLoading , refetch}
}