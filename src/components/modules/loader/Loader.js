"use client"
import CircularText from "./CircularText";
import styles from "./Loader.module.css"
function Loader() {
  return (
    <div className={styles.container}>
        <CircularText
          text="VIP FOODS | VIP FOODS | VIP FOODS | "
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        />
    </div>

  );
}

export default Loader;
