import {
  faChampagneGlasses,
  faGear,
  faHome,
  faPlus,
  faPlusCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import Image from "next/image";

type Props = {
  page: string;
};

export default function Navbar(props: Props) {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo_container}>
        <div className={styles.logo}>
          <Image
            src={"/images/drinks/Spirit.svg"}
            alt="Could not find image"
            layout="fill"
          />
          <p className={styles.web_title}>Drinkable</p>
        </div>
      </div>
      <div className={styles.links}>
        <Link href="/">
          <a>
            <FontAwesomeIcon
              icon={faHome}
              className={
                props.page == "home"
                  ? styles.nav_icon_selected
                  : styles.nav_icon
              }
            />
          </a>
        </Link>
        <Link href="/drinks">
          <a>
            <FontAwesomeIcon
              icon={faChampagneGlasses}
              className={
                props.page == "drinks" ? styles.nav_icon_selected : styles.nav_icon
              }
            />
          </a>
        </Link>
        <Link href="/add">
          <a>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className={
                props.page == "add" ? styles.nav_icon_selected : styles.nav_icon
              }
            />
          </a>
        </Link>
        <Link href="/profile">
          <a>
            <FontAwesomeIcon
              icon={faUser}
              className={
                props.page == "profile"
                  ? styles.nav_icon_selected
                  : styles.nav_icon
              }
            />
          </a>
        </Link>
        <Link href="/settings">
          <a>
            <FontAwesomeIcon
              icon={faGear}
              className={
                props.page == "settings"
                  ? styles.nav_icon_selected
                  : styles.nav_icon
              }
            />
          </a>
        </Link>
      </div>

      <div className="placeholder" />
    </div>
  );
}
