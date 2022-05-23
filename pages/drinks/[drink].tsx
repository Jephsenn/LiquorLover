import type { GetServerSideProps, GetStaticPropsContext } from "next";
import styles from "../../styles/DrinkPage.module.css";
import { drink_types, PrismaClient } from "@prisma/client";
import Layout from "../../src/components/layout";
import Image from "next/image";

type Props = {
  drink: drink_types;
};

/* you can ask me to explain this part but its kinda hard (and also idk if its even right) */

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const drinkIds = await prisma.drink_types.findMany({
    select: { name: true },
  });

  let paths: any[] = [];
  drinkIds.forEach((d) => {
    paths.push({ params: { drink: d.name.replaceAll(" ", "_") } });
  });

  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const prisma = new PrismaClient();
  const drink = await prisma.drink_types.findFirst({
    where: { name: (context.params?.drink as string).replaceAll("_", " ") },
  });

  return { props: { drink } };
}

export default function DrinkPage(props: Props) {
  return (
    <Layout page="drinks">
      <div className={styles.drinks}>
        <Image src={`/images/drinks/${props.drink?.name.replaceAll(" ", "_")}.svg`} alt="Drink Image" />
        <p className={styles.name}> {props.drink?.name} </p>
      </div>
    </Layout>
  );
}
