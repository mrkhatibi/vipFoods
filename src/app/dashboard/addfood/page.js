"use client";

import AddFoodsFun from "@/components/helpers/addFood/AddFood";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import toast, { Toaster } from "react-hot-toast";
import styles from "./FoodForm.module.css";
import Image from "next/image";
import Loader from "@/components/modules/loader/Loader";
import { redirect } from "next/navigation";

function AddFood() {
  const { data, isLoading } = GetUserDataQuery();
  if (isLoading) return <Loader />;
 if (!data){
    redirect("/signin")
  }
  const types = [
    "Appetizers",
    "Main Courses",
    "Salads",
    "Desserts",
    "Beverages",
  ];
  const onsubmit = async (formData) => {
    const id = data._id;
    const name = await formData.get("name");
    const description = await formData.get("description");
    const price = await formData.get("price");
    const type = await formData.get("type");
    const file = await formData.get("image");
    if (!name || !description || !price || !type ) {
      return toast.error("Please fill in all the fields.");
    }
    const res = await AddFoodsFun(id, file, name, description, price, type);
    if (!res) {
      return toast.error("We got into trouble.");
    } else {
      toast.success("Post successfully uploaded.");
    }
  };
  return (
      <div className={styles.formdiv}>
    <div className={styles.container}>
        <Image className={styles.pizza} src="/foods/dish2.png" alt="pizz" width={100}height={100}/>
        <Toaster />
        <form className={styles.form} action={onsubmit}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="food Name"
          />
          <textarea
            className={styles.textarea}
            type="text"
            name="description"
            placeholder="food description"
          />
          <input
            className={styles.input}
            type="number"
            name="price"
            placeholder="food price"
          />
          <div className={styles.radioGroup}>
            {types.map((item, index) => (
              <div key={index} className={styles.radioItem}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  value={item}
                  id={item}
                  name="type"
                />
                <label htmlFor={item}>{item}</label>
              </div>
            ))}
          </div>
          <input className={styles.fileInput} type="file" name="image" />
          <button className={styles.button} type="submit">
            submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFood;
