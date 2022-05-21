import type { GetServerSideProps } from "next";
import styles from "../styles/Profile.module.css";
import Drink from "../src/components/drink";
import { PrismaClient } from "@prisma/client";
import { SDrinkRecord } from "../types/drinks";
import Layout from "../src/components/layout";

type Props = {
  drinks: SDrinkRecord[];
  name: string;
};

export async function getServerSideProps(context: GetServerSideProps) {
  const prisma = new PrismaClient();

  let drinks: SDrinkRecord[] = [];

  let userId = 1; /* TODO: Pull user id */

  let profileDrinks = await prisma.drink_records.findMany({
    where: { userId },
    include: { drink_types: true, locations: true },
  });

  profileDrinks.forEach((d) => {
    let newDate = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    drinks.push({
      id: d.id,
      drink_type: d.drink_types,
      location: d.locations,
      date: newDate,
      description: d.description,
      image: d.image ? d.image : "",
      rating: d.rating,
    });
  });

  return {
    props: {
      drinks,
      name: "Owen",
    },
  };
}

export default function Profile(props: Props) {
  return (
    <Layout page="profile">
      <div className={styles.profile}>
        <div className={styles.top_bar}>
          <p className={styles.welcome_text}> Welcome back, {props.name} </p>
        </div>

        <div className={styles.past_drinks}>
          <p className={styles.past_label}> Past Drinks </p>
          <div className={styles.drink_grid}>
            {props.drinks.map((d) => (
              <Drink
                key={d.id}
                rating={d.rating}
                name={d.drink_type.name}
                description={d.description}
                location={d.location.name}
                date={d.date}
                image={
                  d.image ? d.image : `/images/drinks/${d.drink_type.image}.svg`
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
