'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {user} = useUser()
  useEffect(() => {
    const fetchMyAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // retrieve token from localStorage
        const response = await axios.get('http://localhost:3000/appointments/my', {
          headers: {
            Authorization: `Bearer ${token}`, // include the token in the Authorization header
          },
        });
        console.log(response.data);
        
        setUsername(response.data.user); // assuming username is returned in the response
        setAppointments(response.data.appointments || []); // assuming appointments are returned in the response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching my appointments:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMyAppointments();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Appointments for {user}</h1>
      {appointments.map((appointment, index) => (
        <div key={index} className="bg-white shadow overflow-hidden sm:rounded-lg mb-4">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {appointment.selectedService}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {appointment.date} at {appointment.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserAppointments;
