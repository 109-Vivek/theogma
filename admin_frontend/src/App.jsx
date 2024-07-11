import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Events from "./components/Events";
import Members from "./components/Members";
import AddMember from "./components/AddMember";

function App() {

  return (
    <div className='w-[min(1100px,100%)] mx-auto  text-white'>
      <BrowserRouter>
      <div><Toaster/></div>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="/gallery" element={<Gallery/>}></Route>
          <Route path="/events" element={<Events/>}></Route>
          <Route path="/members" element={<Members/>}></Route>
          <Route path="/add-member/:batchId" element={<AddMember/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;

