import {useState} from "react";
import CreateGalleryEvent from "./CreateGalleryEvent";
import CreateUpcomingEvent from "./CreateUpcomingEvent";


const AdminDashboard = () => {
  return (
    <>
      <div className="border m-8 p-4">
        <div className="font-bold text-xl">Create Gallery Page Event</div>
        <p>Useful for uploading images of already conducted events</p>
        <CreateGalleryEvent />
      </div>

      <div className="border m-8 p-4">
        <div className="font-bold text-xl">Create Upcoming Event</div>
        <p>Useful for creating an upcoming event</p>
        <CreateUpcomingEvent />
      </div>

    </>
  );
};

export default AdminDashboard;
