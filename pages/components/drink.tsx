import Image from "next/image";
import styles from "../../styles/Drink.module.css";


type Props = { name: string; image: string };

export default function Drink(props: Props) {
  return (
    <div className={styles.card}>
      <p>{props.name}</p>
      <Image src={props.image} alt="oops" width="200" height="200"/>
    </div>
  );
}
