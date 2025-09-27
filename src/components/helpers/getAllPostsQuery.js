"use client"

import { useQuery } from "@tanstack/react-query"
import GetAllFoods from "./getAllPosts"


export default function GetAllFoodsQuery() {
    const {data , isLoading} = useQuery({
        queryKey : ["GetAllFoodsQuery"] ,
        queryFn : GetAllFoods
    })
    return {data , isLoading}
}