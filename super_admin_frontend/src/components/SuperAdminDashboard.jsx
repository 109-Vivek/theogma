import axios from "axios";
import { useEffect, useState } from "react";
import CreateAdmin from "./CreateAdmin";
import { toast } from "react-hot-toast";
import { MdDelete } from "react-icons/md";

/**
 * SuperAdminDashboard component.
 * Renders the super admin dashboard with a list of admins and functionality to create and delete admins.
 */
const SuperAdminDashboard = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        getAdmins();
    }, []);

    /**
     * Fetches the list of admins from the server.
     */
    async function getAdmins() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/super-admin/list-admins`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("super_admin_token")}`,
                    },
                }
            );
            setAdmins(response.data.admins);
        } catch (error) {
            console.error("Something went wrong", error);
        }
    }

    /**
     * Handles the deletion of an admin.
     * @param {string} _id - The ID of the admin to be deleted.
     */
    async function handleDelete(_id) {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_SERVER_URL}/super-admin/delete-admin`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("super_admin_token")}`,
                    },
                    data: {
                        adminId: _id,
                    },
                }
            );
            toast.success("Admin Deleted Successfully");
            getAdmins();
        } catch (error) {
            console.error("Something went wrong", error);
        }
    }

    /**
     * Handles the logout functionality.
     * Removes the super admin token from local storage and redirects to the login page.
     */
    function handleLogout() {
        localStorage.removeItem("super_admin_token");
        window.location.href = "/super-admin/login";
    }

    return (
        <div className="flex flex-col w-full p-5 gap-y-5">
            <button
                className="self-end bg-[#1E293B] p-2 border-[0.5px]  rounded-md"
                onClick={handleLogout}
            >
                Logout
            </button>
            <CreateAdmin getAdmins={getAdmins} />
            <div className="w-[min(500px,100%)] rounded-lg border-[0.5px] mx-auto bg-[#1E293B] p-4">
                <div className="flex flex-col border-[#3A475C] divide-y-[0.5px] ">
                    <div className="text-xl p-2 font-bold">Admins</div>
                    {admins.map((admin) => (
                        <Admin
                            handleDelete={handleDelete}
                            key={admin._id}
                            adminData={admin}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Admin = ({ adminData, handleDelete }) => {
    const { name, username, _id } = adminData;

    return (
        <div className="flex p-2 flex-row justify-between  items-center">
            <div>
                <div>{name}</div>
                <div>{username}</div>
            </div>
            <MdDelete className="text-2xl cursor-pointer" onClick={() => handleDelete(_id)} />
        </div>
    );
};

export default SuperAdminDashboard;
