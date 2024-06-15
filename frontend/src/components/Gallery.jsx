import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import axios from "axios";

const Gallery = () => {
  const [galleryEvents, setGalleryEvents] = useState([]);

  useEffect(() => {
    getGalleryEvents();
  }, []);

  const getGalleryEvents = async () => {
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/user/gallery`);
    setGalleryEvents(response.data.galleryEvents);
    
  };

  return (
    <div className="w-[min(1100px,100%)] m-auto">
      {galleryEvents.map((eventData) => (
        <DisplayEvent key={eventData._id} eventData={eventData} />
      ))}
    </div>
  );
};

const DisplayEvent = ({ eventData }) => {
  const { images, name } = eventData;
  const [open, setOpen] = React.useState(false); //To open lightbox
  const [startIndex, setStartIndex] = useState(0); //needed to start the lightbox with clicked image

  return (
    <div>
      <div>{name}</div>
      <div className="m-8 grid grid-cols-2 md:grid-cols-3 gap-4">
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
