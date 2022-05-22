import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Drink.module.css";

type Props = {
  name: string;
  image: string;
  description?: string;
  location?: string;
  date?: string;
  rating?: number;
  flippable?: boolean;
};

function Rating(stars: number) {
  return (
    <>
      <FontAwesomeIcon
        icon={faStar}
        className={stars > 0 ? styles.star_full : styles.star_empty}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={stars > 1 ? styles.star_full : styles.star_empty}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={stars > 2 ? styles.star_full : styles.star_empty}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={stars > 3 ? styles.star_full : styles.star_empty}
      />
      <FontAwesomeIcon
        icon={faStar}
        className={stars > 4 ? styles.star_full : styles.star_empty}
      />
    </>
  );
}

export default function Drink(props: Props) {
  const d = (
    <div className={styles.card}>
      <div className={props.flippable ? styles.card_inner : styles.card_inner_no_flip }>
        <div className={styles.card_front}>
          <div className={styles.card_image}>
            <Image src={props.image} alt="Could not find image" layout="fill" />
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
            <div className={styles.inline_row}>{Rating(props.rating!)}</div>
          </div>
      
      </div>
    </div>
    
  ); 

  if (!props.flippable) {
    return <Link href={`/drinks/${props.name.replaceAll(" ", "_")}`}>
      {d}
    </Link>
  } else {
    return d;
  }
}
