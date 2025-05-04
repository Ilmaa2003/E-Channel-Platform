import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewDoctor from "./ViewDoctor"; // Import the ViewDoctor component
import Swal from 'sweetalert2'; 

import "./AdminHome.css";
import "./patientInterface.css";
import DoctorList from "./DoctorList";



const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you really want to logout?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Logout!",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
    };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === "doctor2") {
            navigate("/AppointmentPatient");
        }
        if (selectedValue === "doctor1") {
            navigate("/NewAppointment");
        }
    };
    // List of images and corresponding quotes
    const slides = [
        {
            image: "url(https://media.istockphoto.com/id/1319031310/photo/doctor-writing-a-medical-prescription.jpg?s=612x612&w=0&k=20&c=DWZGM8lBb5Bun7cbxhKT1ruVxRC_itvFzA9jxgoA0N8=)",
            quote: "Your health is our priority."
        },
        {
            image: "url(https://media.istockphoto.com/id/1460099874/photo/nurse-checking-on-a-patient.jpg?s=612x612&w=0&k=20&c=Nc1xxXBioaZDooQynLqPAcSAI5TPtBPd89D5XfwTCy0=)",
            quote: "Quality care for every patient."
        },
        {
            image: "url('https://www.shutterstock.com/image-illustration/top-view-medical-stethoscope-icon-260nw-2075382679.jpg')",
            quote: "Trust, care, and excellence in healthcare."
        }
    ];
    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto slide change every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    
    
    return (
        <div className="main-container">
            {/* Navbar with Logo, Search Bar, and Buttons */}
            <div className="top-section" style={{ backgroundImage: slides[currentSlide].image }}>
                <nav className="navbar">
                    <h2 className="logo" onClick={() => navigate("/AdminHome")}>APELLO</h2>
                    
                    <div className="nav-buttons">

                    <select className="search-bar5" onChange={handleSelectChange}>
                        <option value="">What are you searching for....</option>
                        <option value="doctor1">Book your appointments</option>
                        <option value="doctor2" >Check doctor availability</option>
                        {/* Add more doctors or options as needed */}
                    </select>
                        <button onClick={() => navigate("/MyAppointments")} className="nav-btn5">My Appointments</button>
                        <button onClick={() => navigate("/UserAccount")} className="nav-btn5">My Profile</button>

                        <button onClick={handleLogout} className="nav-btn5">Logout</button>
                    </div>
                </nav>

                <div className="quote-container">
                    <h2>{slides[currentSlide].quote}</h2>
                </div>
            </div>

            {/* Static Content */}
            <div className="bottom-section">
                <h2>Discover the best healthcare services</h2>
                <p>We provide comprehensive medical solutions for your well-being.</p>
            </div>
            <div>
            <ViewDoctor/>

            </div>
            
        </div>
    );
};

export default LoginPage;
