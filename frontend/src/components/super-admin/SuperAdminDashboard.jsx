import axios from "axios";
import { useEffect, useState } from "react";
import CreateAdmin from "./CreateAdmin";
import { toast } from "react-hot-toast";

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    getAdmins();
  }, []);

  async function getAdmins() {
    try {
      const response = await axios.get(
        "http://localhost:3000/super-admin/list-admins",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAdmins(response.data.admins);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  }

  async function handleDelete(_id)
  {
    try{
      const response = await axios.delete("http://localhost:3000/super-admin/delete-admin", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          adminId: _id,
        },
      }); 
      toast.success("Admin Deleted Successfully");
      getAdmins();
    }
    catch(error)
    {
      console.error("Something went wrong", error);
    }

  }
  return <div>
    {admins.map((admin) => <Admin handleDelete={handleDelete} key={admin._id} adminData={admin}/>)}
    <CreateAdmin getAdmins={getAdmins}/>
  </div>;
};


const Admin = ({adminData,handleDelete}) => {
    const {name, username ,_id} = adminData;

  return (
    <div>
        <div>{name}</div>
        <div>{username}</div>
        <button onClick={()=> handleDelete(_id)} className="border rounded-lg bg-red-500 p-2">Delete </button>
    </div>
  )
}



export default SuperAdminDashboard;
