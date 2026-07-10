import api from "./api";

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

export const getProfile = async () => {
  const token = ensureToken();
  const res = await api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProfile = async (
  name: string,
  email: string
) => {
  const token = ensureToken();
  const res = await api.put(
    "/auth/profile",
    {
      name,
      email,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};