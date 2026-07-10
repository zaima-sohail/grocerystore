import { useState } from "react";
import type { FormEvent } from "react";
import { placeOrder } from "../services/order";
import { checkout } from "../services/payment";

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Step 1: Create Order
      const res = await placeOrder(
        shippingAddress,
        paymentMethod
      );

      // Step 2: If Cash on Delivery
      if (paymentMethod === "Cash") {
        alert("Order placed successfully!");
        window.location.href = "/orders";
        return;
      }

      // Step 3: If Card Payment
      const payment = await checkout(res.order._id);

      // Redirect to Stripe Checkout
      window.location.href = payment.url;

    } catch (error: any) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Checkout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Checkout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block mb-2 font-semibold">
            Shipping Address
          </label>

          <textarea
            rows={4}
            value={shippingAddress}
            onChange={(e) =>
              setShippingAddress(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            placeholder="Enter your shipping address"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Payment Method
          </label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option value="Cash">
              Cash on Delivery
            </option>

            <option value="Card">
              Pay with Stripe Card
            </option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          {loading
            ? "Processing..."
            : paymentMethod === "Cash"
            ? "Place Order"
            : "Proceed to Stripe Payment"}
        </button>

      </form>
    </div>
  );
};

export default Checkout;