import type { GetServerSideProps } from "next";
import Layout from "./components/layout";
import { drink_types, PrismaClient } from "@prisma/client";
import styles from "../styles/Drinks.module.css";
import Drink from "./components/drink";

type Props = {
  drinks: drink_types[];
};

function showInfo(id: number) {

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
  return (
    <Layout page="drinks">
      <div className={styles.drinks}>
        <div className={styles.all_drinks}>
          <div className={styles.drink_grid}>
            {props.drinks.map((d) => (
              <div key={d.id} onClick={()=>showInfo(d.id)}>
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
        </div>
      </div>
    </Layout>
  );
}
