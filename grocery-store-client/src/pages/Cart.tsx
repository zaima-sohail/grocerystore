import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCart } from "../services/cart";

const Cart = () => {
  const [cart, setCart] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        setCart(res.cart);
      } catch (err: any) {
        console.error(err);
        // If unauthorized, prompt user to login
        if (err.response && err.response.status === 401) {
          setError("You must be logged in to view your cart.");
        } else {
          setError("Failed to load cart.");
        }
      }
    };

    fetchCart();
  }, []);

  if (error) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-4">{error}</h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!cart) return <h2>Loading...</h2>;
const totalPrice = cart.items.reduce(
  (total: number, item: any) =>
    total + item.product.price * item.quantity,
  0
);
  return (
    <div className="p-2 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Cart</h1>

      {cart.items?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cart.items.map((item: any, index: number) => {
            const product = item?.product;

            return (
              <div
                key={product?._id || `cart-item-${index}`}
                className="border rounded-xl p-4 shadow-sm flex flex-col"
              >
                <h2 className="font-semibold text-lg">{product?.name || "Product unavailable"}</h2>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm sm:text-base">
                  <div>
                    <div className="text-gray-500">Price</div>
                    <div className="font-medium">Rs. {product?.price ?? 0}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Quantity</div>
                    <div className="font-medium">{item?.quantity ?? 0}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-600">Your cart is empty.</p>
      )}

      <div className="mt-6 text-xl sm:text-2xl font-bold">
        Total: Rs. {totalPrice}
      </div>

      <div className="mt-4">
        <Link
          to="/checkout"
          state={{ totalPrice }}
          className="inline-flex w-full sm:w-auto items-center justify-center bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );

};

export default Cart;