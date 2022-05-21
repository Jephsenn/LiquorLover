import {
  faLocationDot,
  faStar,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from "../../styles/Drink.module.css";

type Props = {
  name: string;
  image: string;
  description?: string;
  location?: string;
  date?: string;
  rating?: number;
};

function Rating(stars: number) {
  return (
    <>
      <FontAwesomeIcon icon={faStar} className={stars > 0 ? styles.star_full : styles.star_empty} />
      <FontAwesomeIcon icon={faStar} className={stars > 1 ? styles.star_full : styles.star_empty} />
      <FontAwesomeIcon icon={faStar} className={stars > 2 ? styles.star_full : styles.star_empty}/>
      <FontAwesomeIcon icon={faStar} className={stars > 3 ? styles.star_full : styles.star_empty} />
      <FontAwesomeIcon icon={faStar} className={stars > 4 ? styles.star_full : styles.star_empty} />
    </>
  );
}

export default function Drink(props: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.card_inner}>
        <div className={styles.card_front}>
          <div className={styles.card_image}>
            <Image
              src={props.image}
              alt="Could not find image"
              layout="fill"
            />
          </div>
          <p className={styles.drink_name_front}>{props.name}</p>
        </div>
        <div className={styles.card_back}>
          <p className={styles.drink_name_back}> {props.name} </p>
          <div className={styles.inline_row}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={styles.location_icon}
            />
            <p> {props.location} </p>
          </div>
          <div className={styles.inline_row}>
            {props.rating ? Rating(props.rating) : <div/>}
          </div>
        </div>
      </div>
    </div>
  );
}
