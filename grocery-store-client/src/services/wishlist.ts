import api from "./api";

export const addToWishlist = async (productId: string) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/wishlist",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getWishlist = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/wishlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const removeWishlist = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/wishlist/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};