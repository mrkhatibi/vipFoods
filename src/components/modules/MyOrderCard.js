"use client";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import styles from "./MyOrderCard.module.css";

function MyOrderCard({ item }) {
  const [status, setStatus] = useState(false);
  const total = item.carts.reduce(
    (acc, cur) => acc + cur.quantity * cur.foodDetails.price,
    0
  );
  return (
    <div className={styles.card}>
      {!status ? (
        <div className={styles.preview}>
          {item.carts.map((food) => (
            <div key={food._id} className={styles.previewItem}>
              <Image
                className={styles.foodImage}
                src={food.foodDetails.image}
                alt="foodicon"
                width={50}
                height={50}
              />
              <p className={styles.quantity}>{food.quantity}</p>
            </div>
          ))}
          <h4 className={styles.date}>
            {new Date(item.createdAt).toLocaleDateString("en-US")}
          </h4>
        </div>
      ) : (
        <div className={styles.details}>
          <h4 className={styles.date}>
            Date of Order :{" "}
            {new Date(item.createdAt).toLocaleDateString("en-US")}
          </h4>
          {item.carts.map((food) => (
            <div key={food._id} className={styles.detailItem}>
              <Image
                className={styles.foodImage}
                src={food.foodDetails.image}
                alt="image"
                width={50}
                height={50}
              />
              <h4 className={styles.foodName}>{food.foodDetails.name}</h4>
              <h4 className={styles.foodPrice}>
                Price : {food.foodDetails.price} $
              </h4>
              <h4 className={styles.foodQuantity}>
                quantity : {food.quantity}
              </h4>
            </div>
          ))}
          <h3 className={styles.total}>total : {total} $</h3>
        </div>
      )}

      {!status ? (
        <button
          className={styles.toggleBtn}
          onClick={() => setStatus(!status)}
        >
          <FaChevronDown />
        </button>
      ) : (
        <button
          className={styles.toggleBtn}
          onClick={() => setStatus(!status)}
        >
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}

export default MyOrderCard;
