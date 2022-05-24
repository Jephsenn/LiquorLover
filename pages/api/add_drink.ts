import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

enum Error {
  None = "",
  Specify = "Could not create drink record",
}

type Data = {
  error: Error;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { locationId, drinkId, rating, description } = req.body;
  const userId = 1; // TODO: Get user id from session
  console.log(req.body);

  if (userId && locationId && userId) {
      console.log("gets here?");
    await prisma.drink_records.create({
      data: { userId, locationId, drinkId, rating, description },
    });
    res.status(200).json({ error: Error.None });
  } else {
    res.status(400).json({ error: Error.Specify });
  }
}
