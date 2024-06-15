import { BrowserRouter, Route, Routes } from "react-router-dom";
import  "./index.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Members from "./components/Members";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import SuperAdminLogin from "./components/super-admin/SuperAdminLogin";
import SuperAdminDashboard from "./components/super-admin/SuperAdminDashboard";
import { Toaster } from "react-hot-toast";
import Events from "./components/Events";

function App() {
  return (
    <BrowserRouter>
      <div>
      <div><Toaster/></div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/members" element={<Members />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/events" element={<Events />}></Route>
          <Route path="/admin/login" element={<AdminLogin />}></Route>
          <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
          <Route path="/super-admin/login" element={<SuperAdminLogin />}></Route>
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;