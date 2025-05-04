// src/Doctor.js
import React, { Component } from 'react';
import axios from 'axios';

class DoctorManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: [],
      doctor: { id: '', name: '', specialization: '', phone: '' },
      isEditing: false
    };
  }

  // Fetch doctors from the API when the component mounts
  componentDidMount() {
    axios.get('http://localhost:5000/api/doctors')
      .then(response => {
        this.setState({ doctors: response.data });
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
  }

  // Handle input changes
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      doctor: { ...this.state.doctor, [name]: value }
    });
  };

  // Add or update a doctor
  handleAddDoctor = (event) => {
    event.preventDefault();
    const { doctor, isEditing, doctors } = this.state;

    if (isEditing) {
      // Update doctor
      axios.put(`http://localhost:5000/api/doctors/${doctor.id}`, doctor)
        .then(response => {
          const updatedDoctors = doctors.map(doc => doc.id === doctor.id ? response.data : doc);
          this.setState({ doctors: updatedDoctors, doctor: { id: '', name: '', specialization: '', phone: '' }, isEditing: false });
        })
        .catch(error => {
          console.error('Error updating doctor:', error);
        });
    } else {
      // Add new doctor
      axios.post('http://localhost:5000/api/doctors', doctor)
        .then(response => {
          this.setState({ doctors: [...doctors, response.data], doctor: { id: '', name: '', specialization: '', phone: '' } });
        })
        .catch(error => {
          console.error('Error adding doctor:', error);
        });
    }
  };

  // Edit a doctor
  handleEditDoctor = (doc) => {
    this.setState({ doctor: doc, isEditing: true });
  };

  // Delete a doctor
  handleDeleteDoctor = (id) => {
    const { doctors } = this.state;
    axios.delete(`http://localhost:5000/api/doctors/${id}`)
      .then(() => {
        this.setState({ doctors: doctors.filter(doc => doc.id !== id) });
      })
      .catch(error => {
        console.error('Error deleting doctor:', error);
      });
  };

  render() {
    const { doctors, doctor, isEditing } = this.state;

    return React.createElement('div', null,
      React.createElement('h2', null, isEditing ? 'Edit Doctor' : 'Add Doctor'),
      React.createElement('form', { onSubmit: this.handleAddDoctor },
        React.createElement('input', {
          type: 'text',
          name: 'name',
          value: doctor.name,
          onChange: this.handleChange,
          placeholder: "Doctor's Name",
          required: true
        }),
        React.createElement('input', {
          type: 'text',
          name: 'specialization',
          value: doctor.specialization,
          onChange: this.handleChange,
          placeholder: 'Specialization',
          required: true
        }),
        React.createElement('input', {
          type: 'text',
          name: 'phone',
          value: doctor.phone,
          onChange: this.handleChange,
          placeholder: 'Phone',
          required: true
        }),
        React.createElement('button', { type: 'submit' }, isEditing ? 'Update Doctor' : 'Add Doctor')
      ),
      React.createElement('h3', null, 'Doctor List'),
      React.createElement('ul', null,
        doctors.map(doc => (
          React.createElement('li', { key: doc.id },
            React.createElement('p', null, `${doc.name} - ${doc.specialization} - ${doc.phone}`),
            React.createElement('button', { onClick: () => this.handleEditDoctor(doc) }, 'Edit'),
            React.createElement('button', { onClick: () => this.handleDeleteDoctor(doc.id) }, 'Delete')
          )
        ))
      )
    );
  }
}

export default DoctorManagement;
