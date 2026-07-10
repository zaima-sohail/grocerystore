import api from "./api";

export const getReviews = async (productId: string) => {
  const res = await api.get(`/reviews/${productId}`);
  return res.data;
};

export const createReview = async (
  productId: string,
  rating: number,
  comment: string
) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    `/reviews/${productId}`,
    { rating, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};