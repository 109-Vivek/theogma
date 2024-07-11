import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreateBatch = ({ getBatches }) => {
  const [batchName, setBatchName] = useState("");
  const [loading,setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const temp = localStorage.getItem("admin_token");
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/create-batch`,
        { batchName },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      if (response.data.msg === "Batch Created Successfully") {
        toast.success("Batch Created Successfully");
        setBatchName("");
        getBatches();
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="border-[0.5px] border-[#374151] rounded-xl p-4 m-4 bg-[#111827]">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5 flex flex-col gap-y-2">
          <label
            htmlFor="batchName"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Batch Name
          </label>
          <input
            type="number"
            id="batchName"
            value={batchName}
            onChange={(e) => setBatchName(e.target.value)}
            required
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Batch Name"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Creating..." : "Create Batch"}
        </button>
      </form>
    </div>
  );
};

export default CreateBatch;
