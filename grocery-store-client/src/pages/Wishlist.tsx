import { useEffect, useState } from "react";
import { addToCart } from "../services/cart";
import {
  getWishlist,
  removeWishlist,
} from "../services/wishlist";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await getWishlist();
      setWishlist(res.wishlist);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      await removeWishlist(id);
      alert("Removed from wishlist");
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const moveToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      alert("Added to cart");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <h1 className="text-4xl font-bold mb-8">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2 className="text-xl text-gray-500">
          No products in wishlist
        </h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div
              key={item._id}
              className="border rounded-xl shadow-lg p-5"
            >
              <img
                src={item.product.image?.url}
                alt={item.product.name}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="text-2xl font-bold mt-4">
                {item.product.name}
              </h2>

              <p className="text-green-600 font-bold mt-2">
                Rs. {item.product.price}
              </p>

              <button
                onClick={() => moveToCart(item.product._id)}
                className="w-full bg-green-600 text-white py-2 rounded mt-4"
              >
                🛒 Move to Cart
              </button>

              <button
                onClick={() => handleRemove(item._id)}
                className="w-full bg-red-500 text-white py-2 rounded mt-3"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;