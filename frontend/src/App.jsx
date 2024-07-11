import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Members from "./components/Members";
import Gallery from "./components/Gallery";
import { Toaster } from "react-hot-toast";
import Events from "./components/Events";
import Background from "./components/background/Background";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Background />
      <Toaster />
      <div className="w-[min(1100px,100%)] mx-auto flex flex-col min-h-screen  text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/members" element={<Members />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/events" element={<Events />}></Route>
        </Routes>
        <div className="flex-grow"></div>
        <Footer className="absolute" />
      </div>
    </BrowserRouter>
  );
}
export default App;
