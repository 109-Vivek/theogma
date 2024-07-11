import React from "react";
import Navbar from "./Navbar";
import CreateUpcomingEvent from "./CreateUpcomingEvent";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";

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
      <Navbar />
      <div className="flex flex-col gap-y-5">
        <CreateUpcomingEvent fetchEvents={fetchEvents} />
        <div
          className="my-12 flex w-full flex-wrap gap-[2%]"
          data-astro-cid-aid3sr62=""
        >
          {events.map((event) => (
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

  async function handleDelete() {
    try {
      const deleted = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/admin/delete-event`,
        {
          data: { eventId: eventData._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      toast.success("Event Deleted Successfully");
      fetchEvents();
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  return (
    <div className="project  p-4 m-4 mb-12 w-full cursor-pointer overflow-hidden md:w-[32%]">
      <div className="grid grid-cols-1 grid-rows-1 overflow-hidden">
        <img src={imageLink} alt={name} className="project-image" />
        <div className="project-image-overlay"></div>
      </div>
      <div className="mt-4">
        <div className="flex flex-row justify-between">
          <h3 className="text-xl font-medium md:text-2xl">{name}</h3>
          <MdDelete
            className="text-2xl cursor-pointer"
            onClick={handleDelete}
          />
        </div>
        <p className="mt-1 text-xs font-normal text-[#ffffffee] md:text-sm ">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Events;
