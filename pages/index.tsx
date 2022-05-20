import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Drink from "./components/drink";
import { PrismaClient } from "@prisma/client";
import { SDrinkRecord } from "../types/drinks";

type Props = {
  drinks: SDrinkRecord[];
};

export async function getServerSideProps(context: GetServerSideProps) {
  const prisma = new PrismaClient();

  let drinks: SDrinkRecord[] = [];

  let userId = 1; /* TODO: Pull user id */

  /*
  let profileDrinks = await prisma.drink_records.findMany({
    where: { userId },
    include: {drink_types: true, locations: true}
  });

  profileDrinks.forEach((d) => {
    let newDate = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) ;
    drinks.push({id: d.id, drink_type: d.drink_types, location: d.locations, date: newDate, description: d.description, image: d.image, rating: d.rating});
  });

  */
 
  return {
    props: {
      drinks
    },
  };
}

function Home(props: Props) {
  console.log(props);
  return (
    <div className={styles.main_container}>
      <Head>
        <title>Liquor Lover</title>
        <meta name="description" content="Find your new favorite drink" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={styles.drink_grid}>
          
          {props.drinks.map((d) => (
            <Drink
              key={d.id}
              rating={d.rating}
              name={d.drink_type.name}
              description={d.description}
              location={d.location.name}
              date={d.date}
              image={`https://www.thecocktaildb.com/images/ingredients/vodka.png`}
            />
          ))}
        </div>
    </div>
  );
}

export default Home;
