"use client";

import { hashPassword } from "@/components/helpers/bcrypt/hashPassword";
import SignUpFun, { checkUserandEmail } from "@/components/utils/signUp";
import toast, { Toaster } from "react-hot-toast";
import styles from "./SignUp.module.css";
import { redirect } from "next/navigation";
import Link from "next/link";
import Loader from "@/components/modules/loader/Loader";
import GetUserDataQuery from "@/components/helpers/getUserQuery";

function SignUp() {
   const {data , isLoading} = GetUserDataQuery()
    if (isLoading) return <Loader />
    if (data) {
      return redirect("/dashboard")
    }
  const onsubmit = async (formData) => {
    const userName = await formData.get("userName");
    const email = await formData.get("email");
    const password = await formData.get("password");
    const role = await formData.get("role");
    if (!role || !userName || !email || !password) {
      return toast.error("please enter all data");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }
    const check = await checkUserandEmail(userName, email);
    if (check) {
      return toast.error(check);
    }
    const hashedPassword = await hashPassword(password);
    const res = await SignUpFun(role, userName, email, hashedPassword);
    if (res) {
      toast.success(`Registration successful. Welcome, ${res}!`);
      setTimeout(() => {
        redirect("/signin");
      }, 2000);
    } else {
      return toast.error("signup failed");
    }
  };
  return (
    <div className={styles.container}>
      <Toaster className={styles.toaster} />
      <form action={onsubmit} style={{ width: "100%" }}>
        <h2 className={styles.title}>Sign Up</h2>

        <div className={styles.radioGroup}>
          <div className={styles.radioWrapper}>
            <input type="radio" name="role" value="USER" id="user" />
            <label htmlFor="user">User</label>
          </div>
          <div className={styles.radioWrapper}>
            <input type="radio" name="role" value="OWNER" id="owner" />
            <label htmlFor="owner">Owner</label>
          </div>
        </div>

        <input
          className={styles.input}
          type="text"
          name="userName"
          placeholder="UserName"
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="email@email.com"
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
      <Link href={"/signin"}>
      <h3>Already have an account? Log in</h3>
      </Link>
    </div>
  );
}

export default SignUp;
