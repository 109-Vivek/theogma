/* eslint-disable react/no-unescaped-entities */
const Home = () => {
  const backgroundImageUrl = 'url("/images/background.jpg")';

  return (
    <div
      className="h-[100vh] flex items-center justify-center"
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: 'opacity(0.9)',
      }}
    >
      <div className="p-6 max-w-md w-full bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">Welcome to THE OGMA!</h1>
        <p className="text-gray-600">
          "An innovation for making the champions of the legal world"
        </p>
      </div>
    </div>
  );
};

export default Home;
