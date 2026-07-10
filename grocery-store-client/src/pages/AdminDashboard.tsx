import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {  const [stats, setStats] = useState({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-blue-500 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">📦 Products</h2>
          <p className="text-4xl font-bold mt-4">
            {stats.products}
          </p>
        </div>

        <div className="bg-green-500 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">🛒 Orders</h2>
          <p className="text-4xl font-bold mt-4">
            {stats.orders}
          </p>
        </div>

        <div className="bg-yellow-500 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">👥 Users</h2>
          <p className="text-4xl font-bold mt-4">
            {stats.users}
          </p>
        </div>

        <div className="bg-red-500 text-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold">💰 Revenue</h2>
          <p className="text-4xl font-bold mt-4">
            Rs. {stats.revenue}
          </p>
        </div>

      </div>

      <div className="mt-10 flex gap-4">
        <Link
          to="/admin/products"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Manage Products
        </Link>

        <Link
          to="/admin/orders"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Manage Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;