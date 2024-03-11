import { BrowserRouter, Route, Routes } from "react-router-dom";
import  "./index.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Members from "./components/Members";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/members" element={<Members />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
