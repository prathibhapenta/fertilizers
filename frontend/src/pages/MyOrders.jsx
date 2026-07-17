import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:5000";
console.log(localStorage.getItem("customer_phone"));

 useEffect(() => {
  const fetchOrders = async () => {
    try {
      const phone = localStorage.getItem("customer_phone");

      if (!phone) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${API_URL}/orders/my/${phone}`
      );

      const data = await response.json();

      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, []);

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loader"></div>
        <h2>Loading Orders...</h2>
      </div>
    );
  }

  return (
    <section className="my-orders-page">

      <h1 className="orders-title">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>
          <p>You haven't placed any orders.</p>
        </div>
      ) : (
        <div className="orders-list">

          {orders.map((order, index) => (
            <div
              className="order-card"
              key={index}
            >

              <div className="order-image">
                <img
                  src={order.product_image}
                  alt={order.product_name}
                />
              </div>

              <div className="order-details">

                <h2>{order.product_name}</h2>

                <p>
                  <strong>Package :</strong>{" "}
                  {order.package_size}
                </p>

                <p>
                  <strong>Price :</strong> ₹
                  {order.price}
                </p>

                <p>
                  <strong>Quantity :</strong>{" "}
                  {order.quantity}
                </p>

                <p>
                  <strong>Total :</strong> ₹
                  {order.total_amount}
                </p>

                <p>
                  <strong>Order Date :</strong>{" "}
                  {new Date(
                    order.created_at
                  ).toLocaleDateString("en-IN")}
                </p>

                <span
                  className={`order-status ${(
                    order.order_status || ""
                  )
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {order.order_status}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}
    </section>
  );
}

export default MyOrders;