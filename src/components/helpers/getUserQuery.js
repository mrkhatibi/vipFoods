"use client"

import { useQuery } from "@tanstack/react-query";
import getUser, { getAllUsers } from "./getUser";



export default function GetUserDataQuery() {
   const {data , isLoading } = useQuery({
    queryKey : ["userData"] ,
    queryFn : getUser
   })
   return {data , isLoading }
}

export  function GetAllUsersDataQuery() {
   const {data , isLoading } = useQuery({
    queryKey : ["AlluserData"] ,
    queryFn : getAllUsers
   })
   return {data , isLoading }
}

