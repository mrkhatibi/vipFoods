import Image from "next/image";
import styles from "./PostCard.module.css";
import noimage from "../../../public/noimage.jpg";
function PostsCard({ post }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={post.image !== "/uploads/blob" ? post.image : noimage}
          alt={post.name}
          fill
          className={styles.image}
          priority
        />
      </div>
      <div className={styles.content}>
        <h2 className={styles.name}>{post.name}</h2>
        <p className={styles.desc}>{post.description}</p>
        <p className={styles.type}>Category: {post.type}</p>
        <p className={styles.price}>{post.price} $</p>
        <small className={styles.date}>
          Created: {new Date(post.createdAt).toLocaleString()}
        </small>
      </div>
    </div>
  );
}

export default PostsCard;
