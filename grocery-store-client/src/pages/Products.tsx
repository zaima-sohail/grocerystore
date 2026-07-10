import { useEffect, useState } from "react";
import axiosInstance from "../services/api";
import type { Product } from "../types/product";
import { addToCart } from "../services/cart";
import { addToWishlist } from "../services/wishlist";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleAddToCart = async (productId: string) => {
    try {
      const res = await addToCart(productId);
      alert(res.message);
    } catch (error: any) {
      console.log(error.response);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  const handleWishlist = async (id: string) => {
    try {
      const res = await addToWishlist(id);
      alert(res.message);
    } catch (err: any) {
      alert(err.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get(
          `/products?page=${page}&keyword=${keyword}&category=${category}`
        );

        setProducts(res.data.products || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, keyword, category]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
  <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
     <input
  type="text"
  placeholder="🔍 Search products..."
  value={keyword}
  onChange={(e) => setKeyword(e.target.value)}
  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
/>

        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Filter by category
        </label>
     <select
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
>
          <option value="">All Categories</option>
          <option value="6a4bb06431196b8195623176">🍎 Fruits</option>
          <option value="6a4e64192537cb34a6ea6621">🥕 Vegetables</option>
          <option value="6a4e642e2537cb34a6ea6624">🥛 Dairy</option>
          <option value="6a4e64462537cb34a6ea6627">🍞 Bakery Products</option>
        </select>
      </div>

      <div>
   <h1 className="text-2xl md:text-4xl font-bold mb-6">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow p-4">
              <img
                src={product.image?.url || "https://placehold.co/300x200?text=No+Image"}
                alt={product.name}
                className="w-full h-56 object-cover"
              />

              <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
              <p className="text-yellow-500 font-semibold mt-2">
                ⭐ {product.averageRating?.toFixed(1) || 0}
                ({product.totalReviews} Reviews)
              </p>

              <p className="text-gray-600">{product.description}</p>

              <p className="text-green-600 font-bold mt-2">Rs. {product.price}</p>

              <button
                onClick={() => handleWishlist(product._id)}
             className="w-full bg-pink-500 hover:bg-pink-600 transition text-white py-2 rounded-lg mt-4"
              >
                ❤️ Add to Wishlist
              </button>

              <button
                onClick={() => handleAddToCart(product._id)}
             className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded-lg mt-3"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
        >
          Previous
        </button>

        <span className="font-semibold">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;

