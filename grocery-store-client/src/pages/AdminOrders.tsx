import { useEffect, useState } from "react";
import api from "../services/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order status updated");
      fetchOrders();
    } catch (err) {
      console.log(err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

      <table className="w-full border">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Change Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id} className="border-b">
              <td className="p-3">
                {order.user?.name}
              </td>

              <td>
                Rs. {order.totalAmount}
              </td>

              <td>
                {order.status}
              </td>

              <td>
                <select
                  className="border rounded p-2"
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;