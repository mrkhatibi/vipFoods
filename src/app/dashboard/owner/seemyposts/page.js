"use client";

import GetOwnerPostsQuery from "@/components/helpers/GetOwnerPostsQuery";
import PostsCard from "@/components/templates/postsCard";
import styles from "./seemyposts.module.css";
import Loader from "@/components/modules/loader/Loader";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import { redirect } from "next/navigation";
function SeeMyPosts() {
  const { data: userData, isLoading: userLoading } = GetUserDataQuery();
  if (userLoading) return <Loader />;
  if (!userData) {
    redirect("/");
  }
  if (userData.role !== "OWNER") {
    redirect("/");
  }
  const { data, isLoading } = GetOwnerPostsQuery();
  if (isLoading) return <Loader />;
  return (
    <div className={styles.allcontainer}>
      <h3>My Posts</h3>
      <div className={styles.container}>
        {data.map((post) => (
          <PostsCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default SeeMyPosts;
