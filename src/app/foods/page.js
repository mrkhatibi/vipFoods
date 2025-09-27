"use client";

import GetAllFoodsQuery from "@/components/helpers/getAllPostsQuery";
import PostsCard from "@/components/templates/postsCard";
import styles from "./Foods.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Searchfood from "@/components/modules/Searchfood";
import SearchFood from "@/components/helpers/searchFood";
import Loader from "@/components/modules/loader/Loader";
function Foods() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("search");
  const [response, setRes] = useState([]);
  useEffect(() => {
    async function getsearch() {
      const res = await SearchFood(query);
      setRes(res);
    }
    getsearch();
  }, [query]);
  const { data, isLoading } = GetAllFoodsQuery();
  let showData = [];
  if (isLoading) return <Loader />;
  {
    !query ? (showData = data) : (showData = response);
  }
  return (
    <div className={styles.allcontainer}>
      <h3>All Foods</h3>
      <Searchfood />
      <div className={styles.deletesearchwraper}>

      {query ? (
        <button
          className={styles.deletesearch}
          onClick={() => router.replace("/foods")}
        >
          delete Search
        </button>
      ) : null}
      </div>

      <div className={styles.container}>
        {showData.map((post) => (
          <Link href={`/foods/${post._id}`} key={post._id}>
            <PostsCard post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Foods;
