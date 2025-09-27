"use client";
import { GetAllUsersDataQuery } from "../helpers/getUserQuery";
import Loader from "./loader/Loader";
import styles from "./ShowUser.module.css"
function ShowUser({ userId }) {
  const { data, isLoading } = GetAllUsersDataQuery();
  if (isLoading) return <Loader />;
  const userData = data.find((item) => item._id === userId);
  return (
    <div className={styles.container}>
      <h3>userName : {userData.userName}</h3>
      <h3>address : {userData.address}</h3>
      <h3>email : {userData.email}</h3>
      <h3>number : {userData.number}</h3>
    </div>
  );
}

export default ShowUser;
