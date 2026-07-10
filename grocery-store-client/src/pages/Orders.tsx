import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders, cancelOrder } from "../services/order";

const Orders = () => {
  const [orders, setOrders] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.orders);
      setError(null);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status === 401) {
        setError("You must be logged in to view your orders.");
        navigate("/login");
      } else {
        setError(err?.response?.data?.message || "Failed to load orders.");
        setOrders([]);
      }
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      const res = await cancelOrder(id);
      alert(res.message);
      loadOrders();
    } catch (err: any) {
      alert(err.response?.data?.message || "Cannot cancel order");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {error ? (
        <div className="text-red-600">{error}</div>
      ) : orders === null ? (
        <h2>Loading...</h2>
      ) : orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-5 mb-5"
          >
            <p>
              <strong>Order ID:</strong> {order._id || "-"}
            </p>

            <p>
              <strong>Status:</strong> {order.status || "Unknown"}
            </p>

            <p>
              <strong>Total:</strong> Rs. {order.totalAmount ?? "-"}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod || "-"}
            </p>

            <p>
              <strong>Address:</strong> {order.shippingAddress || "-"}
            </p>

            <h3 className="font-semibold mt-4">
              Products
            </h3>

            {Array.isArray(order.items) && order.items.length > 0 ? (
              order.items.map((item: any, itemIndex: number) => (
                <div
                  key={item.product?._id || itemIndex}
                  className="ml-4 mb-2"
                >
                  <p>{item.product?.name || "Unknown product"}</p>
                  <p>Quantity: {item.quantity ?? "-"}</p>
                  <p>Price: Rs. {item.price ?? "-"}</p>
                </div>
              ))
            ) : (
              <p className="ml-4 text-gray-600">No products in this order.</p>
            )}

            {order.status === "Pending" && (
              <button
                onClick={() => handleCancel(order._id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel Order
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;