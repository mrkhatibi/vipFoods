"use client"

import { useQuery } from "@tanstack/react-query"
import GetOwnerPosts from "./getOwnerPosts"


export default function GetOwnerPostsQuery() {
    const {data , isLoading} = useQuery({
        queryKey : ["GetOwnerPosts"] ,
        queryFn : GetOwnerPosts
    })
    return { data , isLoading}
}