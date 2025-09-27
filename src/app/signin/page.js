"use client";

import toast, { Toaster } from "react-hot-toast";
import styles from "./SignIn.module.css";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import Loader from "@/components/modules/loader/Loader";
function SignIn() {
  const {data , isLoading} = GetUserDataQuery()
  if (isLoading) return <Loader />
  if (data) {
    return redirect("/dashboard")
  }
  const onsubmit = async (formData) => {
    const userName = await formData.get("userName");
    const password = await formData.get("password");
    if (!userName || !password) {
      return toast.error("please enter all data");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    const res = await signIn("credentials", {
      userName,
      password,
      redirect : false
    });
    if (res.status !==200){
        return toast.error(res.error)
    }else {
        toast.success("login successfuly")
        setTimeout(() => {
            redirect("/")
        }, 1200);
    }
  };
  return (
    <div className={styles.container}>
      <Toaster className={styles.toaster} />
      <form action={onsubmit} style={{ width: "100%" }}>
        <h2 className={styles.title}>Sign In</h2>

        <input
          className={styles.input}
          type="text"
          name="userName"
          placeholder="UserName"
        />

        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="password"
        />

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignIn;
