import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

enum Error {
  None = "",
  Specify = "Could not remove drink record",
}

type Data = {
  error: Error;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;

  if (id) {
    await prisma.drink_records.delete({
        where: { id }
    });
    res.status(200).json({ error: Error.None });
  } else {
    res.status(400).json({ error: Error.Specify });
  }
}
