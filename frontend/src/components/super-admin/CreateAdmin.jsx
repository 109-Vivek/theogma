import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateAdmin = ({getAdmins}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/super-admin/create-admin`,
        { name, username, password },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data.msg === "Admin Created Successfully") {
        toast.success("Admin Created Successfully");
        setUsername("");
        setPassword("");
        setName("");
        getAdmins();

      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Admin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Admin Name"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="adminUsername"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Admin Username
          </label>
          <input
            id="adminUsername"
            type="text"
            placeholder="Admin Username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="adminPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Admin Password
          </label>
          <input
            id="adminPassword"
            type="password"
            placeholder="Admin Password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
