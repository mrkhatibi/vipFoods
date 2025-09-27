"use client";

import GetAllFoodsQuery from "@/components/helpers/getAllPostsQuery";
import { redirect, useParams } from "next/navigation";
import styles from "./FoodDetails.module.css";
import Image from "next/image";
import noimage from "../../../../public/noimage.jpg";
import GetOrderQuery from "@/components/helpers/getOrderQuery";
import SendFoodToOrder, {
  DecreaseFoodFromOrder,
} from "@/components/helpers/sendFoodToOrder";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import Loader from "@/components/modules/loader/Loader";

function FoodsId() {
  const { foodsId } = useParams();
  const { data: orderData, isLoading: orderLoading, refetch } = GetOrderQuery();
  const { data: userData, isLoading: userLoading } = GetUserDataQuery();
  const { data, isLoading } = GetAllFoodsQuery();
  if (isLoading) return <Loader />;
  if (orderLoading) return <Loader />;
  if (userLoading) return <Loader />;
  const foodDetails = data.find((item) => item._id === foodsId);
  const orderSearch = orderData.find(
    (item) => item?.foodDetails._id === foodsId && item.userId === userData._id
  );

  const orderHandler = async () => {
    const id = userData._id
    const res = await SendFoodToOrder(id , foodDetails);
    refetch();
  };

  const decreaseHandler = async () => {
        const id = userData._id
    await DecreaseFoodFromOrder(id , foodDetails);
    refetch();
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Image
          src={
            foodDetails.image !== "/uploads/blob" ? foodDetails.image : noimage
          }
          alt={foodDetails.name}
          fill
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.info}>
        <h1 className={styles.title}>{foodDetails.name}</h1>
        <p className={styles.desc}>{foodDetails.description}</p>

        <div className={styles.meta}>
          <span className={styles.type}>Category: {foodDetails.type}</span>
          <span className={styles.price}>{foodDetails.price} $</span>
        </div>

        <div className={styles.dates}>
          <p>Created: {new Date(foodDetails.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(foodDetails.updatedAt).toLocaleDateString()}</p>
        </div>

        <div className={styles.actions}>
          {userData.role === "OWNER" ? null : (
            <>
              {!orderSearch || orderSearch.quantity === 0 ? (
                <button
                  onClick={() => orderHandler()}
                  className={styles.btnPrimary}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  onClick={() => orderHandler()}
                  className={styles.btnPrimary}
                >
                  +
                </button>
              )}
              {orderSearch && orderSearch.quantity > 1 ? (
                <h3>{orderSearch.quantity}</h3>
              ) : null}

              {orderSearch && orderSearch.quantity > 1 ? (
                <button
                  onClick={() => decreaseHandler()}
                  className={styles.btnPrimary}
                >
                  -
                </button>
              ) : null}
              {orderSearch && orderSearch.quantity === 1 ? (
                <h3>{orderSearch.quantity}</h3>
              ) : null}
              {orderSearch && orderSearch.quantity === 1 ? (
                <button
                  onClick={() => decreaseHandler()}
                  className={styles.btnPrimary}
                >
                  delete
                </button>
              ) : null}
            </>
          )}
          <button
            onClick={() => redirect("/foods")}
            className={styles.btnSecondary}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodsId;
