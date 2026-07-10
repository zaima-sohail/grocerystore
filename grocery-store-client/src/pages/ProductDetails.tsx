import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { addToCart } from "../services/cart";
import { createReview, getReviews } from "../services/review";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      const productData = res.data.product;

      setProduct(productData);
      setAverageRating(productData?.averageRating ?? 0);
      setTotalReviews(productData?.totalReviews ?? 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getReviews(id!);
      setReviews(res.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async () => {
    try {
      const res = await addToCart(product._id);
      alert(res.message);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const submitReview = async () => {
    try {
      await createReview(id!, rating, comment);

      alert("Review added successfully!");

      setRating(5);
      setComment("");

      fetchReviews();
    } catch (err) {
      console.log(err);
      alert("Failed to submit review");
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  if (!product) {
    return (
      <h2 className="text-center text-2xl mt-10">
        Loading...
      </h2>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="grid md:grid-cols-2 gap-10">

        <img
          src={product.image?.url}
          alt={product.name}
          className="w-full h-[280px] sm:h-[360px] md:h-[450px] object-cover rounded-xl shadow-lg"
        />

        <div>

          <h1 className="text-3xl sm:text-4xl font-bold">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-4">
            {product.description}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-6">
            Rs. {product.price}
          </h2>

          <p className="mt-4">
            <strong>Stock:</strong> {product.stock}
          </p>

          <p className="mt-2">
            <strong>Category:</strong>{" "}
            {product.category?.name}
          </p>
  <p className="text-yellow-500 text-lg sm:text-xl mt-3">
  ⭐ {averageRating.toFixed(1)}
  ({totalReviews} Reviews)
</p>
          <button
            onClick={handleAddToCart}
            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
          >
            Add to Cart
          </button>

        </div>

      </div>

      {/* Review Form */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Write a Review
        </h2>

        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Your rating
        </label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="w-full border rounded-lg p-3 mb-4"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <textarea
          rows={4}
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-lg p-4"
        />

        <button
          onClick={submitReview}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Submit Review
        </button>

      </div>

      {/* Customer Reviews */}

      <div className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Customer Reviews
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        ) : (
          reviews.map((review: any) => (
            <div
              key={review._id}
              className="border rounded-lg p-5 mb-5 shadow-sm"
            >
              <h3 className="font-bold text-lg">
                {review.user?.name}
              </h3>

              <p className="text-yellow-500 text-xl mt-2">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="mt-3 text-gray-700">
                {review.comment}
              </p>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ProductDetails;