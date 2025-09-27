"use client";

import GetOrderQuery from "@/components/helpers/getOrderQuery";
import styles from "./CartPage.module.css";
import Image from "next/image";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import SendOrderstoCart from "@/components/helpers/SendOrderToCarts";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/modules/loader/Loader";

function MyOrderCart() {
  const { data: userData, IsLoading: userLoading } = GetUserDataQuery();
  const { data, isLoading, refetch } = GetOrderQuery();
  if (isLoading) return <Loader />;
  if (userLoading) return <Loader />;
if (!userData){
    redirect("/signin")
  }
  const userCart = data.filter((item) => item.userId === userData._id);
  const onsubmit = async () => {
    if (!userData.number && !userData.address){
      return toast.error("Please First Enter Your Address And PhoneNumber")
    }
    const res = await SendOrderstoCart(userData._id, userCart);
    toast.success("Your order has been placed successfully");
    refetch();
  };
  return (
    <div className={styles.container}>
      <Toaster />
      <h1 className={styles.title}>Shopping Cart</h1>

      {userCart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.items}>
          {userCart.map((item) => (
            <div className={styles.item} key={item._id}>
              <div className={styles.imageWrapper}>
                <Image
                  src={item.foodDetails.image}
                  alt={item.foodDetails.name}
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.info}>
                <h2 className={styles.name}>{item.foodDetails.name}</h2>
                <p className={styles.description}>
                  {item.foodDetails.description}
                </p>
                <p className={styles.type}>Category: {item.foodDetails.type}</p>
                <p className={styles.price}>${item.foodDetails.price}</p>
                <p className={styles.quantity}>Quantity: {item.quantity}</p>
                <p className={styles.subtotal}>
                  Subtotal: ${item.foodDetails.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {userCart.length > 0 && (
        <div className={styles.totalWrapper}>
          <h2 className={styles.total}>
            Total: $
            {userCart.reduce(
              (sum, item) => sum + item.foodDetails.price * item.quantity,
              0
            )}
          </h2>
        </div>
      )}
      <button onClick={() => onsubmit()}>Submit</button>
    </div>
  );
}

export default MyOrderCart;
