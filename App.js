import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import LoginPage from "./components/LoginPage";
import DoctorList from "./components/DoctorList";
import AddDoctor from "./components/AddDoctor";
import EditDoctor from "./components/EditDoctor";
import ViewDoctor from "./components/ViewDoctor"; // Import the new view doctor component
import Login from "./components/Login"; // Import the new view doctor component
import AdminHome from "./components/AdminHome"; // Import the new view doctor component
import Navbar from "./components/Navbar"; // Ensure the correct path
import Patient from "./components/Patient"; // Ensure the correct path
import PatientManage from "./components/PatientManage"; // Ensure the correct path
import PatientInterface from "./components/patientInterface"; // Correct import
import UserAccount from "./components/UserAccount"; // Correct import
import Appointment from "./components/appointment";
import Schedule from "./components/schedule";
import ScheduleNav from "./components/schedulenav";
import AppointmentNav from "./components/AppointmentNav";
import AppointmentPatient from "./components/userViewAppointments";
import NewAppointment from "./components/newappointment";
import MyAppointment from "./components/myAppointments";
import ViewDocs from "./components/Viewdocs";




const App = () => {
    return (
        
        <Router>
            
      <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/add-doctor" element={<AddDoctor />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/edit-doctor/:id" element={<EditDoctor />} />
                <Route path="/AdminHome" element={<AdminHome />} />
                <Route path="/Navbar" element={<Navbar />} />
                <Route path="/Patient" element={<Patient />} />
                <Route path="/PatientManage" element={<PatientManage />} />
                <Route path="/view-doctor/:id" element={<ViewDoctor />} />
                <Route path="/patient-interface" element={<PatientInterface />} />
                <Route path="/UserAccount" element={<UserAccount />} />
                <Route path="/appointment" element={<Appointment />} />
                <Route path="/scheduleNav" element={<ScheduleNav />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/appointmentNav" element={<AppointmentNav />} />
                <Route path="/AppointmentPatient" element={<AppointmentPatient />} />
                <Route path="/NewAppointment" element={<NewAppointment />} />
                <Route path="/MyAppointments" element={<MyAppointment />} />
                <Route path="/ViewDocs" element={<ViewDocs />} />


            </Routes>
        </Router>
    );
};

export default App;
