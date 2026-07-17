import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OrderDetails.css";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/orders/get/${id}`
        );

        const data = await response.json();

        if (data.success) {
          setOrder(data.order);
          setItems(data.items);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

  if (loading) {
  return (
    <div className="products-loading">
      <div className="loader"></div>
      <h2>Loading Products...</h2>
    </div>
  );
}
  return (
    <div className="order-details-page">
      <div className="order-details-card">
        <div className="order-header">
          <h1>Order Details</h1>

          <button
            className="back-btn"
            onClick={() => navigate("/orders")}
          >
            Back
          </button>
        </div>

        {/* Customer Details */}

        <div className="order-info">

          <div className="info-row">
            <span>Order ID</span>
            <strong>#{order.id}</strong>
          </div>

          <div className="info-row">
            <span>Customer</span>
            <strong>{order.customer_name}</strong>
          </div>

          <div className="info-row">
            <span>Phone</span>
            <strong>{order.customer_phone}</strong>
          </div>

          <div className="info-row">
            <span>Email</span>
            <strong>{order.customer_email}</strong>
          </div>

          <div className="info-row">
            <span>Address</span>
            <strong>
              {order.address}, {order.city}, {order.state} -{" "}
              {order.pincode}
            </strong>
          </div>

          <div className="info-row">
            <span>Payment Method</span>
            <strong>{order.payment_method}</strong>
          </div>

          <div className="info-row">
            <span>Payment Status</span>

            <strong
              className={
                (order.payment_status || "")
                  .toLowerCase()
                  .replace(/\s+/g, "-")
              }
            >
              {order.payment_status}
            </strong>
          </div>

          <div className="info-row">
            <span>Order Status</span>

            <strong
              className={
                (order.order_status || "")
                  .toLowerCase()
                  .replace(/\s+/g, "-")
              }
            >
              {order.order_status}
            </strong>
          </div>

          <div className="info-row">
            <span>Total Amount</span>
            <strong>₹{order.total_amount}</strong>
          </div>

          <div className="info-row">
            <span>Order Date</span>
            <strong>
              {new Date(order.created_at).toLocaleDateString("en-IN")}
            </strong>
          </div>

        </div>

        <hr />

        {/* Products */}

        <h2 className="products-heading">
          Purchased Products ({items.length})
        </h2>

        <div className="products-list">

          {items.map((item, index) => (
            <div
              className="product-card"
              key={index}
            >
              <div className="product-image">
                <img
                  src={item.product_image}
                  alt={item.product_name}
                />
              </div>

              <div className="product-details">

                <h3>{item.product_name}</h3>

                <p>
                  <strong>Price :</strong> ₹{item.price}
                </p>

                <p>
                  <strong>Quantity :</strong> {item.quantity}
                </p>

                <p>
                  <strong>Subtotal :</strong> ₹{item.subtotal}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default OrderDetails;