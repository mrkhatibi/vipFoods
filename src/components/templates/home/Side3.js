"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Side3.module.css";
import Image from "next/image";

function Side3() {
  const ref = useRef(null);
  const [isVisable, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div
        ref={ref}
        className={`${styles.imageContainer} ${isVisable ? styles.show : ""}`}
      >
        <Image
          className={styles.image}
          src="/afternoontea-img08.jpg"
          alt="Animated"
          width={600}
          height={500}
        />
      </div>
      <div
        ref={ref}
        className={`${styles.textContainer} ${isVisable ? styles.show : ""}`}
      >
        <h3 className={styles.text}>
          How It Works : 
          <br/> 
          Our platform connects restaurant owners with hungry
          customers in a simple and efficient way. For Restaurant Owners:
          Restaurant owners can easily register on the platform, create their
          profile, and showcase their menu. They can post their dishes with
          details, prices, and photos to reach a wider audience and grow their
          business. For Users: Customers can sign up as users, browse through
          restaurants and their menus, and place orders directly from the
          platform. Ordering food becomes quick, convenient, and tailored to
          personal taste. With this system, restaurant owners get more
          visibility and customers enjoy a smooth, reliable food-ordering
          experience—all in one place.
        </h3>
      </div>
    </div>
  );
}

export default Side3;
