import Navbar from "./Navbar";
import React, { useEffect, useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import axios from "axios";
import toast from "react-hot-toast";

import { MdDelete } from "react-icons/md";
import CreateGalleryEvent from "./CreateGalleryEvent";

const Gallery = () => {
  const [galleryEvents, setGalleryEvents] = useState([]);

  useEffect(() => {
    getGalleryEvents();
  }, []);

  const getGalleryEvents = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/gallery`
    );
    setGalleryEvents(response.data.galleryEvents);
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col  gap-y-5 ">
        <CreateGalleryEvent getGalleryEvents={getGalleryEvents} />
        <div className=" p-5 rouded  flex flex-col gap-y-5">
          {galleryEvents.map((eventData) => (
            <DisplayEvent
              key={eventData._id}
              eventData={eventData}
              getGalleryEvents={getGalleryEvents}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const DisplayEvent = ({ eventData, getGalleryEvents }) => {
  const { images, name } = eventData;
  const [open, setOpen] = React.useState(false); //To open lightbox
  const [startIndex, setStartIndex] = useState(0); //needed to start the lightbox with clicked image

  //Delete Gallery Event
  async function handleDelete() {
    try {
      const deleted = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/admin/delete-gallery-event`,
        {
          data: { galleryEventId: eventData._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      toast.success("Gallery Event Deleted Successfully");
      getGalleryEvents();
    } catch (error) {
      if (error.response.data.msg === "Gallery Event not found") {
        toast.error("Gallery Event not found");
      } else toast.error("Error deleting Gallery Event");
    }
  }

  return (
    <div className="bg-[#1E293B] rounded-xl max-md:p-3  p-5 ">
      <div className="flex pb-2 flex-row justify-between max-sm:text-lg  max-md:text-xl text-2xl">
        <div>{name}</div>
        <MdDelete className="text-2xl cursor-pointer " onClick={handleDelete} />
      </div>

      <div className="max-sm:m-1 m-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer">
              <img
                className="h-auto max-w-full rounded-lg"
                src={item}
                alt={`Image ${index}`}
                onClick={() => {
                  setOpen(true);
                  setStartIndex(index);
                }}
              />
            </div>
          );
        })}
      </div>
      <Lightbox
        open={open}
        index={startIndex}
        close={() => setOpen(false)}
        plugins={[Counter, Zoom]}
        counter={{ container: { style: { bottom: "unset", top: 0 } } }}
        slides={images.map((item) => ({ src: item }))}
      />
    </div>
  );
};
export default Gallery;
