import type { GetServerSideProps, GetStaticPropsContext } from "next";
import styles from "../styles/DrinkPage.module.css";
import { drink_types, PrismaClient } from "@prisma/client";

type Props = {
  error?: string;
  drink?: drink_types;
};

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
  return <div>{props.drink?.name + " " + props.drink?.description}</div>;
}
