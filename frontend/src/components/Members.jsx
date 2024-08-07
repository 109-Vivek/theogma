import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Members = () => {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    getBatches();
  }, []);

  async function getBatches() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/user/batches`
      );
      setBatches(response.data);
    } catch (err) {
      toast.error("Error fetching batches");
    }
  }

  return (
    <div>
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

  return (
    <div className="bg-[#111827] bg-opacity-50  opacity-95 rounded-xl max-md:p-3  p-5 ">
      <div className="flex pb-4 flex-row  justify-between max-sm:text-xl max-md:text-2xl text-3xl">
        <div>BATCH OF {batchName}</div>
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
      { memberId }
    );
    setMemberData(response.data);
  }

  return (
    <div className="flex max-w-48 flex-col  bg-gray-800 rounded-xl">
      <div className="group relative max-w-48 rounded-xl  hover:scale-105 overflow-hidden hover:duration-300 shadow-lg group:">
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
