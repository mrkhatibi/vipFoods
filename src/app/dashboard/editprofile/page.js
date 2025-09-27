"use client";

import editProfile from "@/components/helpers/editProfile/editProfile";
import getUser from "@/components/helpers/getUser";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./Profile.module.css"
import Loader from "@/components/modules/loader/Loader";
import GetUserDataQuery from "@/components/helpers/getUserQuery";
import { redirect } from "next/navigation";
function EditProfile() {
  const [owner, setOwner] = useState(false);
  const [edit, setEdit] = useState(false);

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const res = await getUser();
      if (!res){
        return redirect("/signin")
      }
      if (res.role === "OWNER") {
        setOwner(true);
      }
      if (res.address && res.number) {
        setEdit(false);
      }
      setUserData(res);
    }
    getUsers();
  }, [owner]);

  const onsubmit = async (formData) => {
    const response = await getUser();
    const id = response._id;

    const address = await formData.get("address");
    const number = await formData.get("number");
    let resturantName = "";
    let resturantType = "";
    if (owner) {
      resturantName = await formData.get("resturantName");
      resturantType = await formData.get("resturantType");
    }
    const res = await editProfile(
      id,
      address,
      number,
      resturantName,
      resturantType
    );
    if (!res) {
      return toast.error("edit profile failed");
    }else {
      setOwner(false);
      setEdit(false);
      window.location.reload()
    }
  };
  if (userData.length === 0) return <Loader />;
 
  return (
    <div className={styles.container}>
  {!edit ? (
    <div>
      <div className={styles.row}>
        <span className={styles.key}>UserName :</span>
        <span className={styles.value}>{userData.userName}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>Email :</span>
        <span className={styles.value}>{userData.email}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>PhoneNumber :</span>
        <span className={styles.value}>{userData.number}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.key}>Address :</span>
        <span className={styles.value}>{userData.address}</span>
      </div>

      {userData.role === "OWNER" ? (
        <>
          <div className={styles.row}>
            <span className={styles.key}>Resturant Name :</span>
            <span className={styles.value}>{userData.resturantName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.key}>Resturant Type :</span>
            <span className={styles.value}>{userData.resturantType}</span>
          </div>
        </>
      ) : null}

      <button className={styles.button} onClick={() => setEdit(true)}>Edit</button>
    </div>
  ) : (
    <form className={styles.form} action={onsubmit}>
      <input className={styles.input} type="text" placeholder="address" name="address" />
      <input className={styles.input} type="number" placeholder="Phone Number" name="number" />
      {owner && (
        <>
          <input
            className={styles.input}
            type="text"
            placeholder="resturant Name"
            name="resturantName"
          />
          <input
            className={styles.input}
            type="text"
            placeholder="resturant Type"
            name="resturantType"
          />
        </>
      )}
      <button className={styles.button} type="submit">Submit</button>
      <button className={styles.button} type="button" onClick={()=>setEdit(false)}>cancel</button>

    </form>
  )}
</div>


  );
}

export default EditProfile;
