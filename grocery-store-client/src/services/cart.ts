import api from "./api";



export const addToCart = async (productId: string) => {
  const res = await api.post(
    "/cart/add",
    {
      productId,
      quantity: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data;
};


export const getCart = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/cart", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};