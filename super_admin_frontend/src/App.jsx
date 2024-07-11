import SuperAdminLogin from './components/SuperAdminLogin'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SuperAdminDashboard from './components/SuperAdminDashboard';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className='w-[min(1100px,100%)] mx-auto  text-white'>
      <BrowserRouter>
      <div><Toaster/></div>
        <Routes>
          <Route path="/" element={<SuperAdminLogin />}></Route>
          <Route path="/super-admin/login" element={<SuperAdminLogin />}></Route>
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard/>}></Route>
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;


