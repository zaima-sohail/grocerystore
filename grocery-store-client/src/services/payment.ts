import api from "./api";

export const checkout = async (orderId: string) => {
  const token = localStorage.getItem("token");

  const res = await api.post(
    "/payment/checkout",
    { orderId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};