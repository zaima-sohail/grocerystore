import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);

      const product = res.data.product;

      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDescription(product.description);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/products/${id}`,
        {
          name,
          price,
          stock,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Edit Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="border p-3 w-full"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          className="border p-3 w-full"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <input
          type="number"
          className="border p-3 w-full"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

        <textarea
          className="border p-3 w-full"
          placeholder="Description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProduct;