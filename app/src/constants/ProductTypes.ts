import { User } from "./UserTypes";

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image?: string;
  ratings: number;
  numOfReviews: number;
  reviews: Review[];
  createdAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  image?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  user: User;
  rating: number;
  comment: string;
}

export interface GeneralError {
  open: boolean;
  msg: string;
  type?: "error" | "success" | "info";
}
