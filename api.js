// src/api.js

import axios from 'axios';

// Define the base URL of your Spring Boot backend
const BASE_URL = "http://localhost:8083/doc-details/doctors";

export const getDoctors = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    return null;
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(BASE_URL, doctorData);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    return null;
  }
};

export const updateDoctor = async (id, doctorData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, doctorData);
    return response.data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    return null;
  }
};

export const deleteDoctor = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    return `Doctor with ID ${id} deleted successfully`;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return null;
  }
};
