import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateGalleryEvent = ({ getGalleryEvents }) => {
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/admin/create-gallery-event`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      setLoading(false);
      getGalleryEvents();
      // Reset form fields after successful submission if needed
      toast.success("Gallery Event Created Successfully");
      setName("");
      setPhotos([]);
      e.target.reset();
    } catch (error) {
      setLoading(false);
      if (error.response.data.msg == "Event Name already exists") {
        toast.error(error.response.data.msg);
      } else {
        toast.error("Error creating gallery event");
      }

      console.error(error);
    }
  };

  return (
    <div className=" border-[0.5px] border-[#374151] rounded-xl p-4 m-4 bg-[#111827]">
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5 flex flex-col gap-y-2">
          <label
            htmlFor="name"
            className="ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Event Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-50 outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Event Name"
          />
        </div>
        <div className="mb-5 flex flex-col gap-y-2">
          <label
            htmlFor="photos"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Upload Photos:
          </label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setPhotos([...e.target.files])}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateGalleryEvent;
