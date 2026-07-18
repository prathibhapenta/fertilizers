import {sql} from "../config/db.js"


export const createOrder = async (req, res) => {
  try {

    const {
      customer_name,
      customer_email,
      customer_phone,
      address,
      city,
      state,
      pincode,
      payment_method,
      items,
    } = req.body;

    if (!items || items.length === 0) {
  return res.status(400).json({
    success: false,
    message: "Order must contain at least one item",
  });
}

 const total_amount = items.reduce(
  (sum, item) => sum + Number(item.price) * Number(item.quantity),
  0
);
    
 
  const [order] = await sql`
INSERT INTO orders (

customer_name,
customer_email,
customer_phone,
address,
city,
state,
pincode,
total_amount,
payment_method

)

VALUES (

${customer_name},
${customer_email},
${customer_phone},
${address},
${city},
${state},
${pincode},
${total_amount},
${payment_method}

)

RETURNING *;
`;
   for (const item of items) {

  await sql`

  INSERT INTO order_items (

    order_id,
    product_id,
    product_name,
    product_image,
    package_size,
    price,
    quantity,
    subtotal

  )

  VALUES (

    ${order.id},
    ${item.id},
    ${item.title},
    ${item.image},
    ${item.size},
    ${Number(item.price)},
${Number(item.quantity)},
${Number(item.price) * Number(item.quantity)}

  )

  `;

}
    

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      data: order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getOrders = async (req, res) => {
  try {

    const orders = await sql`

      SELECT
        o.id,
        o.customer_name,
        o.customer_email,
        o.customer_phone,
        o.total_amount,
        o.payment_method,
        o.payment_status,
        o.order_status,
        o.created_at,

        COUNT(oi.id) AS total_products,
        COALESCE(SUM(oi.quantity),0) AS total_quantity

      FROM orders o

      LEFT JOIN order_items oi
      ON o.id = oi.order_id

      GROUP BY
        o.id,
        o.customer_name,
        o.customer_email,
        o.customer_phone,
        o.total_amount,
        o.payment_method,
        o.payment_status,
        o.order_status,
        o.created_at

      ORDER BY o.created_at DESC

    `;

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await sql`

      SELECT
        *
      FROM orders
      WHERE id = ${id}

    `;

    if (order.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const items = await sql`
      SELECT
          product_name,
          product_image,
          package_size,
          price,
          quantity,
          subtotal
      FROM order_items
      WHERE order_id=${id}
      `;

    res.json({
      success: true,
      order: order[0],
      items,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { phone } = req.params;

    const orders = await sql`
      SELECT
        o.id,
        o.created_at,
        o.total_amount,
        o.order_status,
        o.payment_status,
        o.payment_method,

        oi.product_id,
        oi.product_name,
        oi.product_image,
        oi.package_size,
        oi.price,
        oi.quantity

      FROM orders o

      JOIN order_items oi
      ON o.id = oi.order_id

      WHERE o.customer_phone = ${phone}

      ORDER BY o.created_at DESC
    `;

    res.json({
      success: true,
      data: orders,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await sql`
      DELETE FROM orders
      WHERE id = ${id}
    `;

    res.json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Delete failed"
    });
  }
};
