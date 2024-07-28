export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  role: "superadmin" | "user";
  country?: string;
  city?: string;
  photo?: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
