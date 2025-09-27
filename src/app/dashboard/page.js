"use client";
import { FaStar } from "react-icons/fa6";

import GetUserDataQuery from "@/components/helpers/getUserQuery";
import styles from "./Dashboard.module.css";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Loader from "@/components/modules/loader/Loader";
import { redirect } from "next/navigation";
function Dashboard() {
  const { data, isLoading } = GetUserDataQuery();
  if (isLoading) return <Loader />
  if (!data){
    redirect("/signin")
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Dashboard</h2>
        {data?.role === "OWNER" && (
          <div className={styles.ownericon}>
            <FaStar size={25} color="gold" />
          </div>
        )}
      </div>
      {data?.role === "OWNER" ? (
        <div className={styles.ownerdivs}>
          <div>
            <Link href={"/dashboard/addfood"}>
              <h3>Add Food</h3>
            </Link>
          </div>
          <div>
            <Link href={"dashboard/editprofile"}>
              <h3>Edit Profile</h3>
            </Link>
          </div>
          <div>
            <Link href={"dashboard/owner/seemyposts"}>
              <h3>See My Posts</h3>
            </Link>
          </div>
          <div>
            <Link href={"dashboard/owner/custumersorder"}>
              <h3>Customer Orders</h3>
            </Link>
          </div>
          <div>
            <h3 onClick={() => signOut()}>Log out</h3>
          </div>
        </div>
      ) : (
        <div className={styles.userdivs}>
          <div>
            <Link href={"dashboard/myordercart"}>
              <h3>My order cart</h3>
            </Link>
          </div>
          <div>
            <Link href={"dashboard/editprofile"}>
              <h3>Edit Profile</h3>
            </Link>
          </div>
          <div>
            <Link href={"dashboard/myorders"}>
              <h3>My orders</h3>
            </Link>
          </div>
          <div>
            <h3 onClick={() => signOut()}>Log out</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
