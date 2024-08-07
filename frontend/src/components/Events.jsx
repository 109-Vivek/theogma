import React from "react";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/events`
    );
    setEvents(response.data.events);
  }

  return (
    <div>
      <div className="flex flex-col gap-y-5">
        <div
          className="my-12 flex w-full flex-wrap gap-[2%]"
        >
          {events.length===0 ? <div className=" max-sm:text-lg  max-md:text-xl lg-max:text-2xl  text-3xl"> No upcoming events </div> : events.map((event) => (
            <Event
              key={event._id}
              eventData={event}
              fetchEvents={fetchEvents}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Event = ({ eventData, fetchEvents }) => {
  const { name, description, registerationLink, imageLink } = eventData;

  return (
    <div className="project  p-4 m-4 mb-12 w-full cursor-pointer overflow-hidden md:w-[32%]">
      <div className="grid grid-cols-1 grid-rows-1 overflow-hidden">
        <img src={imageLink} alt={name} className="project-image" />
        <div className="project-image-overlay"></div>
      </div>
      <div className="mt-4">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl font-medium md:text-2xl">{name}</h3>
        </div>
        <p className="mt-1 text-xs font-normal text-[#ffffffee] md:text-sm ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Events;
