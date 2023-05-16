'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // retrieve token from localStorage
        const response = await axios.get('http://localhost:3000/appointments/my', {
          headers: {
            Authorization: `Bearer ${token}`, // include the token in the Authorization header
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching my appointments:', error);
      }
    };

    fetchMyAppointments();
  }, []);

  return (
    <div>
      <h1>My Appointments</h1>
      {appointments.map((appointment, index) => (
        <div key={index}>
          <p>{appointment.date}</p>
          <p>{appointment.time}</p>
          <p>{appointment.selectedService}</p>
          {/* render other appointment properties as needed */}
        </div>
      ))}
    </div>
  );
};

export default UserAppointments;
