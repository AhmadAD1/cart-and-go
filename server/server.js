import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";

import connectToDB from "./middlewares/dbConnect.js";
import indexRouter from "./routes/index.routes.js";
import testRouter from "./routes/test.routes.js";
import { createAdminUserIfNotExist } from "./models/User.js";


// Create an Express app
const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
connectToDB();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" })); // Allow requests from any origin
app.use(helmet()); // Enhance security by setting various HTTP headers
// Add a custom Cross-Origin-Resource-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(morgan("dev")); // Log HTTP requests
app.use(bodyParser.json()); // Parse request bodies for JSON
app.use(bodyParser.urlencoded({ extended: true })); // Parse request bodies for x-www-form-urlencoded
app.use(express.static("uploads")); // Make uploads folder static

// Routes
// app.use(express.static('uploads'))
app.use("/api", indexRouter);
app.use("/", testRouter);
app.use((err, rea, res, next) => {
  const errorStatus = err.code || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json(errorMessage);
});
createAdminUserIfNotExist();

app.listen(port, () => {
  console.log(`Server listening successfully on \n\t{ SERVER_URL::http://localhost:${port} }`);
});
