import {useState} from "react";
import CreateGalleryEvent from "./CreateGalleryEvent";
import CreateUpcomingEvent from "./CreateUpcomingEvent";


const AdminDashboard = () => {
    // const [formNo, setFormNo] = useState(0);  //0 means no form  1 means create gallery page event  2 means create upcoming event
  return (
    <>
      <div className="border m-8 p-4">
        <div className="font-bold text-xl">Create Gallery Page Event</div>
        <p>Useful for uploading images of already conducted events</p>
        <button  className="border rounded-lg p-2 bg-red-500 text-white">Create Now</button>
        <CreateGalleryEvent />
      </div>

      <div className="border m-8 p-4">
        <div className="font-bold text-xl">Create Upcoming Event</div>
        <p>Useful for creating an upcoming event</p>
        <button className="border rounded-lg p-2 bg-red-500 text-white">Create Now</button>
        <CreateUpcomingEvent />
      </div>

    </>
  );
};

export default AdminDashboard;
