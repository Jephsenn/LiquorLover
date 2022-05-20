import Head from "next/head";

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
    </div>
  );
}
