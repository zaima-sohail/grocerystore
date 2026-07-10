import api from "./api";

export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem("token");

  const res = await api.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};