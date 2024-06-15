import  { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateGalleryEvent = () => {
  const [name, setName] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(); 
    formData.append("name", name);
    photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    try {
      const response = await axios.post("http://localhost:3000/admin/create-gallery-event", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setMessage(response.data.msg);
      // Reset form fields after successful submission if needed
      toast.success("Gallery Event Created Successfully");
      setName("");
      setPhotos([]);

    } catch (error) {
      setLoading(false);
      setMessage("Error creating gallery event.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Gallery Event</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="photos">Upload Photos:</label>
          <input
            type="file"
            id="photos"
            accept="image/*"
            multiple
            onChange={(e)=>setPhotos([...e.target.files])}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateGalleryEvent;
