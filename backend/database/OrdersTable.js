import { sql } from "../config/db.js";

export const createOrdersTable = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,

      customer_name VARCHAR(255) NOT NULL,
      customer_email VARCHAR(255),
      customer_phone VARCHAR(20) NOT NULL,

      address TEXT NOT NULL,
      city VARCHAR(100) NOT NULL,
      state VARCHAR(100) NOT NULL,
      pincode VARCHAR(20) NOT NULL,

      total_amount NUMERIC(10,2) NOT NULL,

      payment_method VARCHAR(50) NOT NULL,
      payment_status VARCHAR(50) DEFAULT 'Pending',

      order_status VARCHAR(50) DEFAULT 'Pending',

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log("Orders table created");
};