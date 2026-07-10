import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data.products.slice(0, 4));
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-green-100 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">

          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold text-green-700">
              Fresh Grocery
            </h1>

            <h2 className="text-4xl font-bold mt-3">
              Delivered to Your Door
            </h2>

            <p className="mt-6 text-gray-700 text-lg">
              Buy fresh fruits, vegetables, dairy,
              bakery items and daily essentials at
              the best prices.
            </p>

            <Link
              to="/products"
              className="inline-block mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
            >
              Shop Now
            </Link>
          </div>

          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700"
              alt="Fresh Grocery"
              className="rounded-xl shadow-lg"
            />
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <div
              key={product._id}
              className="border rounded-lg shadow hover:shadow-xl transition p-4"
            >
              <img
                src={product.image?.url}
                alt={product.name}
                className="h-48 w-full object-cover rounded"
              />

              <h3 className="text-xl font-semibold mt-4">
                {product.name}
              </h3>

              <p className="text-gray-600">
                Rs. {product.price}
              </p>

              <Link
                to={`/product/${product._id}`}
                className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
              >
                View Product
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Shop by Category
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            🍎
            <h3 className="mt-4 font-bold">Fruits</h3>
          </div>

          <div className="bg-white rounded-lg shadow p-8 text-center">
            🥕
            <h3 className="mt-4 font-bold">Vegetables</h3>
          </div>

          <div className="bg-white rounded-lg shadow p-8 text-center">
            🥛
            <h3 className="mt-4 font-bold">Dairy</h3>
          </div>

          <div className="bg-white rounded-lg shadow p-8 text-center">
            🍞
            <h3 className="mt-4 font-bold">Bakery</h3>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          Why Choose Us?
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          <div className="text-center">
            🚚
            <h3 className="text-2xl font-bold mt-4">
              Fast Delivery
            </h3>

            <p className="text-gray-600 mt-3">
              Get groceries delivered quickly to your doorstep.
            </p>
          </div>

          <div className="text-center">
            🥬
            <h3 className="text-2xl font-bold mt-4">
              Fresh Products
            </h3>

            <p className="text-gray-600 mt-3">
              Fresh fruits, vegetables and dairy every day.
            </p>
          </div>

          <div className="text-center">
            💰
            <h3 className="text-2xl font-bold mt-4">
              Best Prices
            </h3>

            <p className="text-gray-600 mt-3">
              Affordable prices with amazing discounts.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;