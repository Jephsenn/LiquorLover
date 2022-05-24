import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Layout.module.css";
import Navbar from "./navbar";

type Props = {
  children: JSX.Element[] | JSX.Element;
  page: string;
};

export default function Layout(props: Props) {
  return (
    <div className={styles.main_container}>
      <Head>
        <title>Liquor Lover</title>
        <meta name="description" content="Find your new favorite drink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar page={props.page} />
      {props.children}
      {props.page != "add" ? (
        <div className={styles.add}>
          <Link href="/add">
            <a>
              <FontAwesomeIcon
                icon={faPlusCircle}
                className={styles.add_icon}
              />
            </a>
          </Link>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
