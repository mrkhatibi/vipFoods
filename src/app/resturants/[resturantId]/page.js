"use client";

import GetAllFoodsQuery from "@/components/helpers/getAllPostsQuery";
import { GetAllUsersDataQuery } from "@/components/helpers/getUserQuery";
import { useParams } from "next/navigation";
import styles from "./ResturantPage.module.css";
import Link from "next/link";
import PostsCard from "@/components/templates/postsCard";
import Loader from "@/components/modules/loader/Loader";
function ResturantId() {
  const { resturantId } = useParams();
  const { data, isLoading } = GetAllFoodsQuery();
  const { data: allUsers, isLoading: allUsersLoading } = GetAllUsersDataQuery();

  if (isLoading) return <Loader />;
  if (allUsersLoading) return <Loader />;
  const resurantDetails = allUsers.find((item) => item._id === resturantId);
  const resturantPosts = data.filter((item) => item.userId === resturantId);

  return (
    <div>
      <div className={styles.resturantCard}>
        <h2 className={styles.title}>{resurantDetails.resturantName || "Resturant"}</h2>

        <p className={styles.info}>
          <strong className={styles.label}>Type:</strong>{" "}
          {resurantDetails.resturantType || "Not specified"}
        </p>

        <p className={styles.info}>
          <strong className={styles.label}>Address:</strong>{" "}
          {resurantDetails.address || "Not specified"}
        </p>

        <p className={styles.info}>
          <strong className={styles.label}>Founder:</strong>{" "}
          {resurantDetails.userName}
        </p>

        <p className={styles.info}>
          <strong className={styles.label}>Register Date:</strong>{" "}
          {new Date(resurantDetails.createdAt).toLocaleDateString("en-US")}
        </p>
      </div>

      <div className={styles.postsWrapper}>
        {resturantPosts.map((item) => (
          <Link
            key={item._id}
            href={`/foods/${item._id}`}
            className={styles.postLink}
          >
            <PostsCard post={item} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ResturantId;
