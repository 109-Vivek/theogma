import  { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateUpcomingEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [registerationLink, setRegisterationLink] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(); 
    formData.append("name", name);
    formData.append("description", description);
    formData.append("registerationLink", registerationLink);
    formData.append("eventImage", eventImage);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/admin/create-event`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setLoading(false);
      setMessage(response.data.msg);
      // Reset form fields after successful submission if needed
      toast.success("Upcoming Event Created Successfully");
      setName("");
      setDescription("");
      setRegisterationLink("");
      setEventImage("");

    } catch (error) {
      setLoading(false);
      setMessage("Error creating upcoming event.");
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
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e)=> setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="registerationLink">Registeration Link :</label>
          <input
            type="text"
            id="registerationLink"
            value={registerationLink}
            onChange={(e)=> setRegisterationLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="eventImage">Upload Photo:</label>
          <input
            type="file"
            id="eventImage"
            accept="image/*"
            onChange={(e)=>setEventImage(e.target.files[0])}
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

export default CreateUpcomingEvent;
