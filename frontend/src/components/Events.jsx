import axios from "axios";
import { useEffect, useState } from "react";



const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/events`);
    setEvents(response.data.events);
  }

  return (
    <div>
      {events.map((event) => (
        <Event key={event._id} eventData={event} />
      ))}
      ;
    </div>
  );
};

const Event = ({ eventData }) => {
  const { name, description, registerationLink, imageLink } = eventData;
  return (
    <div className="border p-2 flex flex-col justify-center items-center">
      <img src={imageLink}/>
      <h1>{name}</h1>
      <p>{description}</p>
      <Link to={registerationLink}>Register Now</Link>
    </div>
  );
};

export default Events;
