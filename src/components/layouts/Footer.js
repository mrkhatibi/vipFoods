import Image from "next/image"
import styles from "./Header.module.css"
function Footer() {
  return (
    <div className={styles.footer}>
        <Image className={styles.footerimg} src="/foods/chillies.png" alt="tomato" width={70} height={80}/>
        <h2>Developed By MrKhatibi</h2>
        <Image className={styles.footerimg} src="/foods/tomato.png" alt="tomato"  width={70} height={80}/>

    </div>
  )
}

export default Footer