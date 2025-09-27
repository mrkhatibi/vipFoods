"use client";

import { useState } from "react";
import ShowUser from "../modules/ShowUser";
import Image from "next/image";
import styles from "./CustomersCard.module.css"
function CustomersCard({ item }) {
  const [showUser, setShowUser] = useState(false);
  return (
    <div className={styles.orderCard}>
  <button
    className={styles.toggleUserBtn}
    onClick={() => setShowUser(!showUser)}
  >
    {!showUser ? "Show User Details" : "Hide User Details"}
    
  </button>

  <p className={styles.orderDate}>
    Date: {new Date(item.createdAt).toLocaleString("en-US")}
  </p>

  {showUser && <ShowUser userId={item.userId} />}

  <div className={styles.itemsList}>
    {item.items.map((card, index) => (
      <div key={index} className={styles.itemCard}>
        <Image
          src={card.image}
          alt={card.name}
          width={100}
          height={100}
          className={styles.itemImage}
        />
        <h3 className={styles.itemName}>
          Name: {card.name} , Type: {card.type}
        </h3>
        <h4 className={styles.itemPrice}>
          Price & Count: {card.price} $ × {card.quantity} ={" "}
          {card.price * card.quantity} $
        </h4>
      </div>
    ))}
  </div>
</div>

  );
}

export default CustomersCard;
