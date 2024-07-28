import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 8080;
const JWT_SECRET = process.env.JWT_SECRET;

export { DB_URL, PORT, JWT_SECRET };
