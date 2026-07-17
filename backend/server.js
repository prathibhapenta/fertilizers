import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { initDatabase } from "./database/initDatabase.js";
import ProductRoutes from "./routes/ProductRoutes.js"
import AuthRoutes from "./routes/AuthRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";
dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cors())

app.use("/products", ProductRoutes)
app.use("/auth", AuthRoutes);
app.use("/orders", OrderRoutes);

const startServer = async () => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();