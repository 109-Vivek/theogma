import { FaLinkedin } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const ProfileCard = ({ name, position, linkedin, path }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-xs mx-auto my-4 transform transition-transform hover:scale-105">
      <img src={path} alt={name} className="w-full h-32 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600">{position}</p>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center mt-2 text-blue-500"
        >
          <FaLinkedin className="mr-2" /> LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;