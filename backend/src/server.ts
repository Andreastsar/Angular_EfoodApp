import express from "express";
import cors from "cors";
import productsRoutes from "./routes/products.routes";
import usersRoutes from "./routes/users.routes";
import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

// Dotenv configuration
dotenv.config();

// Connect to Mongoose
mongoose
   .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedtopology: true,
   } as ConnectOptions)
   .then(
      (res) => {
         console.log("Connected to Mongoose");
      },
      (error) => console.log(error)
   );

const app = express();
const port = process.env.PORT || 5000;

// -------------------------------------------------------------------------

// Express JSON
app.use(express.json());

// Cors
app.use(
   cors({
      credentials: true,
      origin: "http://localhost:4200",
   })
);

// ---------------- Routes --------------

// Product routes
app.use("/api/products", productsRoutes);

// Users routes
app.use("/api/users", usersRoutes);
// -------------------------------------------------------------------------

// Listen
app.listen(port, () => {
   console.log("listening on port " + port);
});
