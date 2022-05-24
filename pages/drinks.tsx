import type { GetServerSideProps } from "next";
import Layout from "../src/components/layout";
import { drink_types, PrismaClient } from "@prisma/client";
import styles from "../styles/Drinks.module.css";
import { useState } from "react";
import Drink from "../src/components/drink";

type Props = {
  drinks: drink_types[];
};

async function showInfo(id: number) {
  console.log("show info working");
}

export async function getServerSideProps(context: GetServerSideProps) {
  const prisma = new PrismaClient();

  let drinkTypes = await prisma.drink_types.findMany();

  return {
    props: {
      drinks: drinkTypes,
    },
  };
}

export default function Drinks(props: Props) {
  const [selectedDrink, setSelectedDrink] = useState(-1);

  return (
    <Layout page="drinks">
      <div className={styles.drinks}>
        <div className={styles.all_drinks}>
          <div className={styles.drink_grid}>
            {props.drinks.map((d) => (
              <div key={d.id} onClick={() => setSelectedDrink(d.id)}>
                <Drink
                  name={d.name}
                  description={d.description}
                  image={`/images/drinks/${d.image}.svg`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.locations}>
          <p>Click on a drink to get started!</p>
          {selectedDrink == -1 ? (
            <div>You have not clicked a drink yet...</div>
          ) : (
            <div>You clicked a drink! {selectedDrink}</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
