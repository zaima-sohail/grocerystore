import { useState } from "react";
import type { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder } from "../services/order";
import { checkout } from "../services/payment";
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const totalPrice = (location.state as { totalPrice?: number } | null)?.totalPrice ?? 0;

  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
     const res = await placeOrder(
  shippingAddress,
  paymentMethod
);
   const payment = await checkout(res.order._id);

window.location.href = payment.url;
    } catch (error) {
      console.error(error);
      const err: any = error;
      const msg = err?.response?.data?.message || err?.message || "Order failed";
      alert(msg);
      if (err?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>
<button
  onClick={() =>
    navigate("/payment", {
      state: {
        amount: totalPrice,
      },
    })
  }
  className="bg-green-600 text-white px-6 py-3 rounded"
>
  Proceed to Payment
</button>
<h2 className="text-2xl font-bold mb-4">
  Total Amount: Rs. {totalPrice}
</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border p-2 w-full mb-4"
        >
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Place Order
        </button>
      </form>
  

    </div>
  );
 
};

export default Checkout;