import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../services/cart";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;

      try {
        const res = await getCart();

        const total = res.cart.items.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );

        setCartCount(total);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-xl md:text-2xl font-bold"
        >
          🛒 Grocery Store
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link to="/" className="hover:text-yellow-300">
            Home
          </Link>

          <Link to="/products" className="hover:text-yellow-300">
            Products
          </Link>

          <Link to="/cart" className="hover:text-yellow-300">
            🛒 ({cartCount})
          </Link>

          <Link to="/wishlist" className="hover:text-yellow-300">
            ❤️ Wishlist
          </Link>

          {token ? (
            <>
              <Link to="/orders" className="hover:text-yellow-300">
                Orders
              </Link>

              <Link
                to="/profile"
                className="font-semibold hover:text-yellow-300"
              >
                {user?.name}
              </Link>

              {user?.role === "admin" && (
                <Link to="/admin" className="hover:text-yellow-300">
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300">
                Login
              </Link>

              <Link to="/register" className="hover:text-yellow-300">
                Register
              </Link>
            </>
          )}

        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 flex flex-col px-6 py-4 space-y-4">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
          >
            🛒 Cart ({cartCount})
          </Link>

          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
          >
            ❤️ Wishlist
          </Link>

          {token ? (
            <>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
              >
                Orders
              </Link>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
              >
                {user?.name}
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="bg-red-500 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;