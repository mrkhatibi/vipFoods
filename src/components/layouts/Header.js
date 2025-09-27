"use client";

import Image from "next/image";
import logo from "../../../public/logos/1.png";
import styles from "./Header.module.css";
import { PiPizzaFill } from "react-icons/pi";
import { PiPizzaDuotone } from "react-icons/pi";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const [mobilemenu, setMobileMenu] = useState(false);
  const { data } = useSession();

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.lefttheader}>
          <Link href={"/"}>
            <Image src={logo} alt="logo" width={100} height={100} />
          </Link>

          <Link href={"/"}>
            <h3>Home</h3>
          </Link>
          <Link href={"/resturants"}>
            <h3>Resturants</h3>
          </Link>
          <Link href={"/foods"}>
            <h3>Foods</h3>
          </Link>
        </div>
        {!data?.user ? (
          <button>
            <Link href={"/signup"}>Login 🍕 SignUp</Link>
          </button>
        ) : (
          <button>
            <Link href={"/dashboard"}>🍕Dashboard🍕</Link>
          </button>
        )}
      </div>
      <div
        onClick={() => setMobileMenu(!mobilemenu)}
        className={styles.mobilemenu}
      >
        {!mobilemenu ? (
          <PiPizzaDuotone size={40} color="tomato" />
        ) : (
          <div className={styles.mobilemenucontainer}>
            <PiPizzaFill size={40} color="tomato" />
            <div className={styles.mobilemenuwindow}>
              <Link href={"/"}>
            <h3>Home</h3>
          </Link>
          <Link href={"/resturants"}>
            <h3>Resturants</h3>
          </Link>
          <Link href={"/foods"}>
            <h3>Foods</h3>
          </Link>
              {!data?.user ? (
                <button className={styles.mobilebutton}>
                  <Link href={"/signup"}>Login 🍕 SignUp</Link>
                </button>
              ) : (
                <button className={styles.mobilebutton}>
                  <Link href={"/dashboard"}>🍕Dashboard🍕</Link>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
