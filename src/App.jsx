import NavBar from "./Components/NavBar";
import Home from "./Pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import LabReports from "./Pages/Lab Report/LabReport";
import Priscription from "./Pages/Prescription/Priscription";
import AppoinmentReminder from "./Pages/Appoinments-Reminder/AppoinmentReminder";
import Profile from "./Pages/Profile/profile";
import Login from "./Components/Login";
import UploadinReports from "./Pages/Lab Report/UploadinReports";
import UploadePrescription from "./Pages/Prescription/UploadePrescription";
import Signup from "./Components/Signup";
import SearchUser from "./Pages/SearchSection/SearchUser";
import SetUserAccess from "./Pages/SearchSection/SetUserAccess";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/labReport" element={<LabReports />} />
        <Route path="/prescription" element={<Priscription />} />
        <Route path="/appoinmentReminder" element={<AppoinmentReminder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/uploadeR" element={<UploadinReports />} />
        <Route path="/uploadeP" element={<UploadePrescription />} />
        <Route path="/search" element={<SearchUser />} />
        <Route path="/setaccess" element={<SetUserAccess />} />
        {/* <Route path="/HealthProfile" element={<HealthProfile />} /> */}
      </Routes>
    </>
  );
}

export default App;
