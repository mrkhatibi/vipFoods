"use client";
import { FcSearch } from "react-icons/fc";
import { redirect } from "next/navigation";
import styles from "./SearchBox.module.css";
import SplitText from "../modules/split/SplitText";

function Searchfood() {
  const searchHandler = async (formData) => {
    const name = await formData.get("name");
    redirect(`/foods?search=${name}`);
  };
  return (
    <div className={styles.searchBox}>
      
        <SplitText
          text="Search for the name of your kind dish"
          className="text-2xl font-semibold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
      
      <form action={searchHandler} className={styles.searchForm}>
        <input placeholder="Food Name" type="text" name="name" />
        <button type="submit">
          <FcSearch />
        </button>
      </form>
      <h2 className={styles.text}>
        Looking for something delicious? Just type the name of any dish you have
        in mind, and we’ll search through all our available meals to find it for
        you.
      </h2>
    </div>
  );
}

export default Searchfood;
