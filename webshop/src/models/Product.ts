import { Category } from "./Category";

export type Product = {
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
  id?: number;
}

type Rating = {
  rate: number,
  count: number
}