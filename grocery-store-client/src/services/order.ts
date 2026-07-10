import api from "./api";

export const placeOrder = async (
  shippingAddress: string,
  paymentMethod: string
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Throw an axios-like error shape so callers can handle uniformly
    throw {
      response: {
        status: 401,
        data: { message: "Not authenticated" },
      },
    };
  }


  const res = await api.post(
    "/orders",
    {
      shippingAddress,
      paymentMethod,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


const getToken = () => localStorage.getItem("token");

const ensureToken = () => {
  const token = getToken();
  if (!token) {
    throw {
      response: {
        status: 401,
        data: { message: "Not authenticated" },
      },
    };
  }
  return token;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/orders/my-orders", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const cancelOrder = async (id: string) => {
  const token = ensureToken();

  const res = await api.put(
    `/orders/cancel/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};