import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify/${token}`);

        setSuccess(true);
        setMessage(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (err: any) {
        setSuccess(false);
        setMessage(
          err.response?.data?.message || "Verification failed"
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">

        <h1 className="text-3xl font-bold mb-6">
          Email Verification
        </h1>

        <p
          className={`text-lg ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>

        {success && (
          <p className="mt-4 text-gray-600">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;