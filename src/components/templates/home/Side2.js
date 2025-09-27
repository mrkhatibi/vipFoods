"use client";

import Searchfood from "@/components/modules/Searchfood";
import Image from "next/image";
import styles from "./Side2.module.css";
function Side2() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.floatwrap}>
          <Image
            className={styles.float}
            src="/chillies.png"
            alt="hero1-2"
            width={70}
            height={70}
          />
        </div>
        <div className={styles.imagewrapper}>
          <Image
            className={styles.image}
            width={700}
            height={500}
            src="/about_1_1.png"
            alt="pizza"
          />
          <div className={styles.searchbox}>
            <Searchfood />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Side2;
