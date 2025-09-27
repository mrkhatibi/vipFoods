"use client"

import { useQuery } from "@tanstack/react-query"
import GetOrder from "./getOrder"


export default function GetOrderQuery() {
    const {data ,  isLoading , refetch} = useQuery({
        queryKey : ["GetOrder"] ,
        queryFn : GetOrder
    })
    return {data , isLoading, refetch}
}