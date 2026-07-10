import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AddProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const payload = {
        name,
        price: Number(price),
        stock: Number(stock),
        category,
        description,
        ...(image ? { image: { url: image } } : {}),
      };

      await api.post("/products", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
      alert("Failed to Add Product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Product Name"
          className="border w-full p-3 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border w-full p-3 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border w-full p-3 rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border w-full p-3 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border w-full p-3 rounded"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border w-full p-3 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;