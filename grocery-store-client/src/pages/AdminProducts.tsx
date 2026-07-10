import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { deleteProduct } from "../services/product";
const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  };
const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);

    alert("Product deleted successfully");

    fetchProducts();
  } catch (err) {
    console.log(err);
    alert("Failed to delete product");
  }
};
  return (
    <div className="max-w-7xl mx-auto p-8">
   <div className="flex justify-between items-center mb-6">
  <h1 className="text-4xl font-bold">
    Manage Products
  </h1>

  <Link
    to="/admin/products/add"
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded"
  >
    + Add Product
  </Link>
</div>
      <table className="w-full border">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr key={product._id} className="border-b">
              <td className="p-2">
                <img
                  src={product.image?.url}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>

              <td>{product.name}</td>
              <td>Rs. {product.price}</td>
              <td>{product.stock}</td>

              <td>
                <Link
                  to={`/admin/products/edit/${product._id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;