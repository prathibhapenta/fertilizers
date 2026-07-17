import "./Checkout.css";
import { useEffect, useState } from "react";
import { useNavigate,  Link  } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { CheckCircle } from "lucide-react";

function Checkout() {
  const navigate = useNavigate();

  const [placingOrder, setPlacingOrder] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    address: "",
    payment_method: "Cash on Delivery",
    notes: "",
  });

 useEffect(() => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartItems(cart);
  setPageLoading(false);
}, []);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const deliveryCharge = subtotal > 0 ? 100 : 0;

  const total = subtotal + deliveryCharge;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = async () => {
  if (
    !formData.customer_name ||
    !formData.customer_phone ||
    !formData.address ||
    !formData.city ||
    !formData.state ||
    !formData.pincode
  ) {
    alert("Please fill all required fields.");
    return;
  }

  const orderData = {
    ...formData,
    total_amount: total,
    items: cartItems,
  };

  try {
    if (placingOrder) return;

setPlacingOrder(true);
    const response = await fetch(
      "http://localhost:5000/orders/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.success) {
  // Save customer details for My Orders
  localStorage.setItem("customer_phone", formData.customer_phone);
  localStorage.setItem("customer_name", formData.customer_name);

  if (data.success) {
  console.log("Saving phone:", formData.customer_phone);

  localStorage.setItem(
    "customer_phone",
    formData.customer_phone
  );

  console.log(
    "Saved:",
    localStorage.getItem("customer_phone")
  );

  setOrderSuccess(true);
}

  localStorage.removeItem("cart");

  window.dispatchEvent(new Event("cartUpdated"));

  setOrderSuccess(true);
} else {
      alert(data.message);
      setPlacingOrder(false);
    }
  } catch (error) {
    console.log(error);
    setPlacingOrder(false);
  }
};
if (orderSuccess) {
  return (
    <div className="order-success-overlay">
      <div className="order-success-box">

        <CheckCircle
          className="order-success-icon"
        />

        <h1 className="order-success-title">
          Order Placed Successfully!
        </h1>

        <p className="order-success-text">
          Thank you for shopping with TerraVita.
          <br />
          Your order has been received and will be processed shortly.
        </p>

        <div className="order-success-actions">

          <Link
            to="/myorders"
            className="order-success-orders-btn"
          >
            My Orders
          </Link>

          <Link
            to="/products"
            className="order-success-shop-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>
    </div>
  );
}
  return (
    <>
    <section className="checkout-page">
      <h1 className="checkout-heading">
        Checkout
      </h1>

      <div className="checkout-wrapper">

        {/* Left */}

        <div className="checkout-left">

          <div className="checkout-card">

            <h2>Shipping Address</h2>

            <div className="form-grid">

              <input
                type="text"
                name="customer_name"
                placeholder="Full Name"
                value={formData.customer_name}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="customer_phone"
                placeholder="Phone Number"
                value={formData.customer_phone}
                onChange={handleChange}
              />

              <input
                type="email"
                name="customer_email"
                placeholder="Email Address"
                value={formData.customer_email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="city"
                placeholder="Village / City"
                value={formData.city}
                onChange={handleChange}
              />

              <input
                type="text"
                name="district"
                placeholder="District"
                value={formData.district}
                onChange={handleChange}
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
              />

              <textarea
                rows="4"
                name="address"
                placeholder="Complete Address"
                value={formData.address}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="checkout-card">

            <h2>Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment_method"
                value="Cash on Delivery"
                checked={
                  formData.payment_method ===
                  "Cash on Delivery"
                }
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment_method"
                value="Razorpay"
                checked={
                  formData.payment_method ===
                  "Razorpay"
                }
                onChange={handleChange}
              />
              Razorpay
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment_method"
                value="UPI"
                checked={
                  formData.payment_method ===
                  "UPI"
                }
                onChange={handleChange}
              />
              UPI
            </label>

          </div>

        </div>

        {/* Right */}

        <div className="checkout-right">

          <div className="summary-card">

            <h2>Order Summary</h2>

            {cartItems.map((item) => (

              <div
                className="summary-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.title}
                />

                <div>

                  <h4>{item.title}</h4>

                  <p>Qty : {item.quantity}</p>

                </div>

                <span>
                  ₹{item.price * item.quantity}
                </span>

              </div>

            ))}

            <div className="price-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="price-row">
              <span>Delivery Charge</span>
              <span>₹{deliveryCharge}</span>
            </div>

            <div className="price-row total-row">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

           <button
  className="place-order-btn"
  onClick={placeOrder}
  disabled={placingOrder}
>
  {placingOrder ? "Placing Order..." : "Place Order"}
</button>

          </div>

        </div>

      </div>
    </section>
     
    </>
  );
}

export default Checkout;