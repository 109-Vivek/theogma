import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CreateBatch from "./CreateBatch";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";

const Members = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    getBatches();
  }, []);

  async function getBatches() {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/user/batches`
    );
    setBatches(response.data);
  }

  return (
    <div>
      <Navbar />
      <CreateBatch getBatches={getBatches} />
      <div className="flex flex-col gap-y-6 p-4">
        {batches.map((batch) => (
          <Batch key={batch._id} getBatches={getBatches} batchData={batch} />
        ))}
      </div>
    </div>
  );
};

const Batch = ({ batchData, getBatches }) => {
  const { batchName, members } = batchData;
  const navigateTo = useNavigate();

  //Delte complete Batch
  async function handleAddMember() {
    navigateTo(`/add-member/${batchData._id}`);
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/admin/delete-batch`,
        {
          data: { batchId: batchData._id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          },
        }
      );
      toast.success("Batch Deleted Successfully");
      getBatches();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete batch");
    }
  }

  return (
    <div className="bg-[#1E293B] rounded-xl max-md:p-3  p-5 ">
      <div className="flex pb-4 flex-row  justify-between max-sm:text-xl max-md:text-2xl text-3xl">
        <div>BATCH OF {batchName}</div>
        <div className="flex flex-row gap-x-2">
          <button
            onClick={() => {
              handleAddMember(batchData._id);
            }}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center"
          >
            Add Member
          </button>
          <button
            onClick={handleDelete}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center"
          >
            Delete Batch
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center gap-5">
        {members.length === 0 ? (
          <div> No members present in this batch </div>
        ) : (
          members.map((member) => (
            <Member key={member} getBatches={getBatches} memberId={member} />
          ))
        )}
      </div>
    </div>
  );
};

const Member = ({ memberId, getBatches }) => {
  const [memberData, setMemberData] = useState({});

  useEffect(() => {
    getMemberDetails();
  }, []);

  async function getMemberDetails() {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/user/get-member`,
      { memberId },
    );
    setMemberData(response.data);
  }

  //Delete Member
  async function handleDelete() {
    const token = localStorage.getItem("admin_token");
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/admin/delete-member`,
      { memberId },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      }
    );
    toast.success("Member Deleted Successfully");
    getBatches();
  }

  return (
    <div className="flex  flex-col  bg-gray-800 rounded-xl">
      <div className="group relative w-60 rounded-xl  hover:scale-105 overflow-hidden hover:duration-300 shadow-lg group:">
        <img className="w-full opacity-75" src={memberData.imageLink} />
        <div className="absolute  collapse group-hover:visible group-hover:duration-500 group-hover:transition-all  p-4 inset-0 flex flex-col justify-end gap-2 items-center bg-black bg-opacity-50 text-white">
          <div className="flex flex-row gap-x-5">
            {memberData.linkedIn && (
              <Link
                to={memberData.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-4xl text-gray-300"
              >
                <FaLinkedin />
              </Link>
            )}
            {memberData.github && (
              <Link
                to={memberData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-4xl text-gray-300"
              >
                <FaGithub />
              </Link>
            )}
            <MdDelete
              onClick={handleDelete}
              className="mt-2 cursor-pointer text-4xl text-gray-300"
            />
          </div>
          <h2 className="text-2xl text-center bold font-semibold">
            {memberData.name}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Members;
