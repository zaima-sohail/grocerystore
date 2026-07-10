import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/user";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();
      setName(res.user.name);
      setEmail(res.user.email);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await updateProfile(
        name,
        email
      );

      alert(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        My Profile
      </h1>

      <form onSubmit={handleSubmit}>
        <input
          className="border p-2 w-full mb-4"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="border p-2 w-full mb-4"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;