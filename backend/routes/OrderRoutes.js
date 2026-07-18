import express from "express";
import { createOrder, getOrderById, getOrders, getOrdersByUser,deleteOrder } from "../controllers/OrdersControllers.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/get", getOrders);
router.get("/get/:id", getOrderById);
router.get("/my/:phone", getOrdersByUser);
router.delete("/delete/:id", deleteOrder);

export default router;