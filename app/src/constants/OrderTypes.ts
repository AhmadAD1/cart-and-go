import { Product } from "./ProductTypes";

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order extends Document {
  orderItems: OrderItem[];
  user: string;
  price?: number;
  session?: string;
  _id: string;
  createdAt: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
