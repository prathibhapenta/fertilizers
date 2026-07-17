import { createProductsTable } from "./ProductsTable.js";
import { createOrdersTable } from "./OrdersTable.js";
import { createUsersTable } from "./UsersTable.js";
import { createOrderItemsTable } from "./OrderItemsTable.js";

export const initDatabase = async () => {
  try {
    await createProductsTable();
    await createOrdersTable();
    await createUsersTable();
    await createOrderItemsTable();

    console.log(" Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
};