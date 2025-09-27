"use client"

import { GetAllUsersDataQuery } from "@/components/helpers/getUserQuery"
import Image from "next/image"
import styles from "./resturants.module.css"
import Link from "next/link"
import Loader from "@/components/modules/loader/Loader"

function Resturants() {
    const {data , isLoading} = GetAllUsersDataQuery()
    if (isLoading)return <Loader />
    const owners = data.filter(item=> (item.role === "OWNER"))
  return (
    <div className={styles.container}>
        <h3 className={styles.title}>Resturants</h3>
        <div className={styles.card}>
            {
                owners.map (item=> (
                  <div key={item._id}>
                    <Link href={`/resturants/${item._id}`}>
                    <Image className={styles.image} src="/restaurant.jpg" alt="icon" width={170} height={170} />
                    <h3>{item.resturantName ? item.resturantName : "Resturant"}</h3>
                    </Link>
                  </div>
                ))
            }
        </div>
    </div>
  )
}

export default Resturants