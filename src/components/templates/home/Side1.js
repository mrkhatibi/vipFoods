import MotionUse from "@/components/modules/motion/MotionUse";
import styles from "./Side1.module.css";
import Image from "next/image";
function Side1() {
  return (
    <div className={styles.container}>
      <h1 className={styles.motionTitle}>
        <MotionUse />
      </h1>
      <div className={styles.floatwrap}>
        <Image
          className={styles.float}
          src="/hero-1-2.png"
          alt="hero1-2"
          width={300}
          height={300}
        />
      </div>
      <div className={styles.floatwrap2}>
        <Image
          className={styles.float}
          src="/hero-1-3.png"
          alt="hero1-2"
          width={300}
          height={300}
        />
      </div>
      <div className={styles.floatwrap3}>
        <Image src="/hero-1-5.png" alt="hero1-2" width={100} height={100} />
      </div>
      <div className={styles.herowrap}>
        <Image
          className={styles.hero}
          src="/hero-img.png"
          alt="hero1-2"
          width={878}
          height={490}
        />
      </div>
      <h1 className={styles.siteName}>VIP &nbsp;&nbsp;&nbsp;&nbsp; FOOD</h1>
    </div>
  );
}

export default Side1;
