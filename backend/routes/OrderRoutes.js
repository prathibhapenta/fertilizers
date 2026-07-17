import express from "express";
import { createOrder, getOrderById, getOrders, getOrdersByUser } from "../controllers/OrdersControllers.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/get", getOrders);
router.get("/get/:id", getOrderById);
router.get("/my/:phone", getOrdersByUser);


export default router;