import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./schedule.css";
import Swal from 'sweetalert2';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);

  const [doctors, setDoctors] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [editSchedule, setEditSchedule] = useState(null);
  const [showAddScheduleForm, setShowAddScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    doctorId: "",
    doctorName: "",
    appointmentDate: "",
    startTime: "",
    endTime: "",
    status: "", // Assuming "A" for active

  });

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  // For sidebar toggle

  useEffect(() => {
    fetchSchedules();
    fetchSpecializations();
    fetchDoctors1();
  }, []);





  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  // Fetch specializations on component mount
  const fetchSpecializations = async () => {
    try {
      const response = await axios.get("http://localhost:8083/doc-details/doctors/specializations");
      setSpecializations(response.data);
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/doc-details/doctors`, {
        params: { spec: selectedSpecialization || "" }, // Ensure spec is defined
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const fetchDoctors1 = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/doc-details/doctors/doctor-names`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };



  const handleEditSpecializationChange = async (event) => {
    const newSpecialization = event.target.value;
    setSelectedSpecialization(newSpecialization);

    // Fetch doctors based on new specialization
    await fetchDoctors(newSpecialization);

    // Reset doctor selection
    setEditSchedule((prev) => ({
      ...prev,
      doctorId: "",
      doctorName: "",
    }));
  };





  const handleEditDoctorChange = (event) => {
    const doctorName = event.target.value;

    // Fetch doctor ID based on the selected name and specialization
    fetchDoctorId(doctorName, selectedSpecialization);

    setEditSchedule((prev) => ({
      ...prev,
      doctorName: doctorName,
    }));
  };



  // Handle specialization selection
  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);

    fetchDoctors(selectedSpecialization);
  };

  // Fetch doctors when specialization changes
  useEffect(() => {
    fetchDoctors();
  }, [selectedSpecialization]);

  // Fetch specializations when component mounts
  useEffect(() => {
    fetchSpecializations();
  }, []);

  const fetchDoctorId = async (doctorName, specialization) => {
    try {
      setEditSchedule((prevState) => ({
        ...prevState,
        doctorName: doctorName,  // Update doctorName in the form state
      }));

      console.log("Fetching doctor ID with parameters:");
      console.log("Doctor Name:", doctorName);
      console.log("Specialization:", specialization);



      // Ensure that you are passing the specialization properly
      const response = await axios.get(
        `http://localhost:8083/doc-details/doctors/search?name=${doctorName}&specialization=${specialization}`
      );

      if (response.data) {
        console.log("Response:", response.data);

        const doctorId = response.data;
        setEditSchedule((prevState) => ({
          ...prevState,
          doctorId: doctorId,
        }));

        document.getElementById("docId").value = doctorId;

        console.log("Doctor ID:", doctorId);

        // Update the state with the new schedule
        setNewSchedule((prevState) => ({
          ...prevState,
          doctorId, // Save the doctorId to state
          doctorName,
        }));
      }
    } catch (error) {
      console.error("Error fetching doctor ID:", error);
    }
  };


  const fetchDoctorId1 = async (doctorName, specialization) => {
    try {
      console.log("Fetching doctor ID with parameters:");
      console.log("Doctor Name:", doctorName);
      console.log("Specialization:", specialization);

      // Ensure that you are passing the specialization properly
      const response = await axios.get(
        `http://localhost:8083/doc-details/doctors/search?name=${doctorName}&specialization=${specialization}`
      );

      if (response.data) {
        console.log("Response:", response.data);

        const doctorId = response.data;

        document.getElementById("docId1").value = doctorId;

        console.log("Doctor ID:", doctorId);

        // Update the state with the new schedule
        setNewSchedule((prevState) => ({
          ...prevState,
          doctorId, // Save the doctorId to state
          doctorName,
        }));
      }
    } catch (error) {
      console.error("Error fetching doctor ID:", error);
    }
  };



  const handleDoctorChange = (event) => {
    const doctorName = event.target.value;

    // Fetch the doctor ID based on the selected doctor and specialization
    fetchDoctorId(doctorName, selectedSpecialization);
    fetchDoctorId1(doctorName, selectedSpecialization);

    // Update the state with the doctor name
    setNewSchedule((prevState) => ({
      ...prevState,
      doctorName: doctorName,
    }));
  };




  // Handle doctor selection change


  const fetchSchedules = async () => {
    const response = await axios.get("http://localhost:8085/appointment-details/schedules");
    setSchedules(response.data);
  };

  const [specialization, setSpecialization] = useState("");



  const fetchDoctorSpecialization = async (name) => {
    try {
      const response = await axios.get(`http://localhost:8083/doc-details/doctors?doctorName=${name}`);
      setSpecialization(response.data.specialization); // Assuming the response contains specialization
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };


  const Selected = () => {
    var comboBox = document.getElementById("myComboBox");
    var selectedValue = comboBox.value;
    fetchDoctorSpecialization(selectedValue);

  }



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule({ ...newSchedule, [name]: value });
  };



  const saveNewSchedule = async () => {
    // Clear the error message before checking
    setErrorMessage("");

    // Validate if all fields are filled
    if (!newSchedule.doctorId || !newSchedule.doctorName || !newSchedule.appointmentDate || !newSchedule.startTime || !newSchedule.endTime) {
      setErrorMessage("Please fill out all fields!");
      return; // Prevent save if any field is empty
    }

    // Validate the start time and end time gap
    const startTime = new Date(`${newSchedule.appointmentDate}T${newSchedule.startTime}`);
    const endTime = new Date(`${newSchedule.appointmentDate}T${newSchedule.endTime}`);

    if (endTime <= startTime) {
      setErrorMessage("End time must be after the start time.");
      return; // Prevent save if the end time is not after the start time
    }

    // Validate appointment cannot be in the past
    const currentTime = new Date();
    if (startTime < currentTime) {
      setErrorMessage("Appointment time cannot be in the past.");
      return; // Prevent save if the appointment time is in the past
    }


    const url = await axios.get(`http://localhost:8085/appointment-details/schedules/check-conflict?appointmentDate=${newSchedule.appointmentDate}&startTime=${newSchedule.startTime}&endTime=${newSchedule.endTime}&doctorId=${newSchedule.doctorId}`);

    if (url.data == true) {
      setErrorMessage("Already an appointment is scheduled on selected time slot");
      return;
    }

    // Proceed to save if no errors
    try {
      await axios.post("http://localhost:8085/appointment-details/schedules/save", newSchedule);
      setNewSchedule({ doctorId: "", doctorName: "", appointmentDate: "", startTime: "", endTime: "", status: "A" });
      setShowAddScheduleForm(false);
      fetchSchedules(); // Fetch the updated list of schedules

      // Reset the error message on successful submission
      setErrorMessage("");
      Swal.fire("Schedule Added Successfully");
    } catch (error) {
      setErrorMessage("Failed to add schedule. Please try again.");
    }
  };


  /*const saveEdit = async () => {
    setErrorMessage("");

    // Validate if all fields are filled
    if (!editSchedule.doctorId || !editSchedule.doctorName || !editSchedule.appointmentDate || !editSchedule.startTime || !editSchedule.endTime) {
      setErrorMessage("Please fill out all fields!");
      return;
    }

    // Validate start time and end time gap
    const startTime = new Date(`${editSchedule.appointmentDate}T${editSchedule.startTime}`);
    const endTime = new Date(`${editSchedule.appointmentDate}T${editSchedule.endTime}`);

    if (endTime <= startTime) {
      setErrorMessage("End time must be after the start time.");
      return;
    }

  

    // Check if there is a scheduling conflict
    const url = await axios.get(`http://localhost:8085/appointment-details/schedules/check-conflict?appointmentDate=${editSchedule.appointmentDate}&startTime=${editSchedule.startTime}&endTime=${editSchedule.endTime}&doctorId=${editSchedule.doctorId}`);

    if (url.data === true) {
      setErrorMessage("Already an appointment is scheduled on the selected time slot.");
      return;
    }

    // Proceed with saving the edited schedule
    try {
      await axios.put(`http://localhost:8085/appointment-details/schedules/${editSchedule.id}`, editSchedule);
      Swal.fire("Schedule Updated Successfully");
      setEditSchedule(null);
      fetchSchedules();
    } catch (error) {
      setErrorMessage("Failed to update schedule. Please try again.");
    }
  };*/

  const saveEdit = async () => {
    setErrorMessage("");

    // Validate if all fields are filled
    if (
      !editSchedule.doctorId ||
      !editSchedule.doctorName ||
      !editSchedule.appointmentDate ||
      !editSchedule.startTime ||
      !editSchedule.endTime
    ) {
      setErrorMessage("Please fill out all fields!");
      return;
    }

    // Validate start time and end time gap
    const startTime = new Date(`${editSchedule.appointmentDate}T${editSchedule.startTime}`);
    const endTime = new Date(`${editSchedule.appointmentDate}T${editSchedule.endTime}`);

    if (endTime <= startTime) {
      setErrorMessage("End time must be after the start time.");
      return;
    }

    // Validate appointment cannot be in the past


    // Log parameters for conflict check
    console.log("Checking conflict with parameters:", {
      appointmentDate: editSchedule.appointmentDate,
      startTime: editSchedule.startTime,
      endTime: editSchedule.endTime,
      doctorId: editSchedule.doctorId,
    });

    const previousAppointmentDate = editSchedule.appointmentDate;
    const previousStartTime = editSchedule.startTime;
    const previousEndTime = editSchedule.endTime;
    const previousDrId = editSchedule.doctorId;

    try {
      // Check if there is a scheduling conflict only if values have changed
      if (
        editSchedule.appointmentDate !== previousAppointmentDate ||
        editSchedule.startTime !== previousStartTime ||
        editSchedule.endTime !== previousEndTime ||
        editSchedule.doctorId !== previousDrId
      ) {
        const response = await axios.get(
          `http://localhost:8085/appointment-details/schedules/check-conflict?appointmentDate=${editSchedule.appointmentDate}&startTime=${editSchedule.startTime}&endTime=${editSchedule.endTime}&doctorId=${editSchedule.doctorId}`
        );

        if (response.data === true) {
          setErrorMessage("An appointment is already scheduled for the selected time slot.");
          return;
        }
      }

      // **Log the JSON body before updating**
      console.log("Updating schedule with parameters:", editSchedule);

      // Proceed with updating the schedule
      await axios.put(
        `http://localhost:8085/appointment-details/schedules/${editSchedule.id}`,
        editSchedule
      );

      Swal.fire("Schedule Updated Successfully");
      setEditSchedule(null);
      fetchSchedules();
    } catch (error) {
      console.error("Error updating schedule:", error);
      setErrorMessage("Failed to update schedule. Please try again.");
    }
  };



  const cancelAddSchedule = () => {
    setShowAddScheduleForm(false);
  };

  const cancelEdit = () => {
    setEditSchedule(null);
  };

  useEffect(() => {
    console.log("Updated doctors:", doctors);
  }, [doctors]); // Logs whenever doctors update


  const confirmDelete = async () => {
    await axios.delete(`http://localhost:8085/appointment-details/schedules/${deleteScheduleId}`);
    setShowConfirmDelete(false);
    setDeleteScheduleId(null);
    fetchSchedules();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const scrollToEditForm = () => {
    // Scroll down to the edit form
    const editForm = document.getElementById("editScheduleForm");
    if (editForm) {
      editForm.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };



  const handleEdit = (schedule) => {
    setEditSchedule({
      ...schedule,
      id: schedule.id,
      doctorId: schedule.doctorId,
      doctorName: schedule.doctorName,
      appointmentDate: schedule.appointmentDate,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      specialization: schedule.specialization,
      status: schedule.status,
    });
    setSelectedSpecialization(schedule.specialization);
    fetchDoctors1(schedule.specialization);
    scrollToEditForm();
  };





  useEffect(() => {
    if (selectedSpecialization) {
      fetchDoctors();
    }
  }, [selectedSpecialization]);

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <span className="sidebar-toggle-btn" onClick={toggleSidebar}>
        &#9776; {/* Hamburger Menu Icon */}
      </span>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="close-sidebar-btn" onClick={toggleSidebar}>
          &times;
        </button>

        <ul>
          <li><Link to="/AdminHome" >Home</Link></li>
          <li><Link to="/Navbar">Doctors</Link></li>
          <li><Link to="/PatientManage">Patients</Link></li>
          <li><Link to="/ScheduleNav">Schedule</Link></li>
          <li><Link to="/appointmentNav">Appointment</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isSidebarOpen ? "shifted" : ""}`}>
        <h2 className="text">Schedule Management</h2>

        {/* Add Schedule Button */}
        <button
          className="btn btn-success mb-4"
          onClick={() => setShowAddScheduleForm(!showAddScheduleForm)}
        >
          {showAddScheduleForm ? "Cancel" : "Add Schedule"}
        </button>

        {/* Add Schedule Form */}
        {showAddScheduleForm && (
          <div className="mb-4">
            <h4>Add New Schedule</h4>

            <div className="mb-3">



            </div>
            <div className="mb-3">
              <label>Doctor Specialization:</label>
              <select
                name="specialization"
                className="form-control"
                value={selectedSpecialization}
                id="specializationId"
                onChange={handleSpecializationChange}
              >
                <option value="">Select Specialization</option>
                {specializations.map((specialization, index) => (
                  <option key={index} value={specialization}>
                    {specialization}
                  </option>
                ))}
              </select>


              <label>Doctor Name:</label>
              <select
                name="doctorName"
                className="form-control"
                value={newSchedule.doctorName}
                onChange={handleDoctorChange}
                onFocus={fetchDoctors}

              >
                <option value="">Select Doctor</option>
                {doctors.length > 0 ? (
                  doctors.map((doctor, index) => (
                    <option key={index} value={doctor}>
                      {doctor}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>No doctors available</option>
                )}
              </select>



              <div className="mb-3">
                <label>Doctor ID:</label>
                <input
                  type="text"
                  name="doctorId"
                  className="form-control"
                  value={newSchedule.doctorId}
                  id="docId"
                  onChange={handleInputChange}
                  readOnly // Making doctorId non-editable

                />
              </div>

            </div>
            <div className="mb-3">
              <label>Appointment Date:</label>
              <input
                type="date"
                name="appointmentDate"
                className="form-control"
                value={newSchedule.appointmentDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                className="form-control"
                value={newSchedule.startTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                className="form-control"
                value={newSchedule.endTime}
                onChange={handleInputChange}
              />
            </div>
            {/* Status Combo Box */}
            <div className="mb-3">
              <label>Status:</label>
              <select
                name="status"
                className="form-control"
                value={newSchedule.status}
                onChange={(e) => {
                  setNewSchedule((prevState) => ({
                    ...prevState,
                    status: e.target.value,
                  }));
                }}
              >
                <option value="">Select Status</option>
                <option value="Booked">Booked</option>
                <option value="Not Booked">Not Booked</option>
              </select>
            </div>
            {errorMessage && <p className="errormsg">{errorMessage}</p>}

            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={saveNewSchedule}>Save</button>
              <button className="btn btn-secondary" onClick={cancelAddSchedule}>Cancel</button>
            </div>
          </div>
        )}

        {/* Schedule Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Appointment Date</th>
              <th>Doctor Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>{schedule.appointmentDate}</td>
                  <td>{schedule.doctorName}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                  <td>{schedule.status}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => handleEdit(schedule)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        setShowConfirmDelete(true);
                        setDeleteScheduleId(schedule.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No schedules available</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Edit Schedule Form */}
        {editSchedule && (
          <div id="editScheduleForm" className="mb-4">
            <h4>Edit Schedule</h4>

            {editSchedule && (
              <div id="editScheduleForm" className="edit-form">






                <label>Doctor Specialization:</label>
                <select
                  name="specialization"
                  className="form-control"
                  value={selectedSpecialization}
                  id="specializationId"
                  onChange={handleSpecializationChange}
                >
                  <option value="">Select Specialization</option>
                  {specializations.map((specialization, index) => (
                    <option key={index} value={specialization}>
                      {specialization}
                    </option>
                  ))}
                </select>


                <label>Doctor Name:</label>
                <select
                  name="doctorName"
                  className="form-control"
                  value={editSchedule.doctorName}
                  onChange={handleDoctorChange}
                  onFocus={fetchDoctors}

                >
                  <option value="">Select Doctor</option>
                  {doctors.length > 0 ? (
                    doctors.map((doctor, index) => (
                      <option key={index} value={doctor}>
                        {doctor}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>No doctors available</option>
                  )}
                </select>



                <div className="mb-3">
                  <label>Doctor ID:</label>
                  <input
                    type="text"
                    name="doctorId"
                    className="form-control"
                    value={editSchedule.doctorId}
                    id="docId1"
                    onChange={handleInputChange}
                    readOnly // Making doctorId non-editable

                  />
                </div>





                <label>Appointment Date:</label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={editSchedule.appointmentDate}
                  onChange={(e) => setEditSchedule({ ...editSchedule, appointmentDate: e.target.value })}
                />

                <label>Start Time:</label>
                <input
                  type="time"
                  name="startTime"
                  value={editSchedule.startTime}
                  onChange={(e) => setEditSchedule({ ...editSchedule, startTime: e.target.value })}
                />

                <label>End Time:</label>
                <input
                  type="time"
                  name="endTime"
                  value={editSchedule.endTime}
                  onChange={(e) => setEditSchedule({ ...editSchedule, endTime: e.target.value })}
                />



                <label>Status:</label>
                <select
                  value={editSchedule.status}
                  onChange={(e) => setEditSchedule({ ...editSchedule, status: e.target.value })}
                >
                  <option value="Booked">Booked</option>
                  <option value="Not Booked">Not Booked</option>
                </select>

                {errorMessage && <p className="error-message">{errorMessage}</p>}


              </div>
            )}


            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={saveEdit}>Save</button>
              <button className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        )}

        {/* Confirm Delete Modal */}
        {showConfirmDelete && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button className="close" onClick={() => setShowConfirmDelete(false)}>
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this schedule?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
                  <button className="btn btn-secondary" onClick={() => setShowConfirmDelete(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;
