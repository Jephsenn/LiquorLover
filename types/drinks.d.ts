import { drink_types, locations } from "@prisma/client";

export interface SDrinkRecord { /* Serializable Drink Record */
  id: number;
  rating: number;
  description: string;
  image: string;
  date: string /* Store as string cause JSON serialization */;
  location: locations;
  drink_type: drink_types;
}
