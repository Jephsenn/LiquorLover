import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Drink from "./components/drink";

type Props = { drinks: string[] };

export async function getServerSideProps(context: GetServerSideProps) {
  let drinks: string[] = [];

  await fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((response) => response.json())
    .then((data) => {
      data.drinks.forEach((d: any) => {
        drinks.push(d.strIngredient1);
      });
    });

  return {
    props: { drinks },
  };
}

function Home(props: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Liquor Lover</title>
        <meta name="description" content="Find your new favorite drink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.drinkGrid}>
          {props.drinks.map((d) => (
            <Drink
              key={d}
              name={d}
              image={`https://www.thecocktaildb.com/images/ingredients/${d}.png`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;
