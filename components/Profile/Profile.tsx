'use client'
import React, { useEffect, useState } from 'react';  // add useEffect and useState imports
import axios from 'axios';  // add axios import
import { useUser } from '@/context/UserContext';  // existing import

interface Appointment {
  date: string;
  time: string;
  selectedService: string;
  // Add other properties of an appointment if applicable
}


export default function Profile() {
  const { user } = useUser();  // fetch the user data from the context
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  // fetch appointments when the user data is loaded
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && user) {
      axios
        .get('http://localhost:3000/appointments/my', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAppointments(response.data.appointments);
        })
        .catch((error) => {
          console.error('Error fetching appointments:', error);
        });
    }
  }, [user]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
        <div className="flex items-center space-x-5">
          <img className="block mx-auto h-24 rounded-full" src="https://place-hold.it/100x100" alt="User Profile" />
          <div className="block pl-2">
            <h2 className="text-lg font-bold">
              {user && user.username ? user.username : 'Loading...'}
            </h2>
            <p className="text-sm text-gray-500">
              {user && user.username ? user.username : 'Loading...'}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <p className="text-sm text-gray-500">
            {user && user.username ? user.username : 'Loading...'}
          </p>
          <button className="mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Edit Profile
          </button>

          {/* Render appointments if they exist */}
          {appointments && (
            <>
              <h3 className="text-lg font-bold mt-5">Your appointments:</h3>
              {appointments.map((appointment, index) => (
                <div key={index}>
                  <p>{appointment.date}</p>
                  <p>{appointment.time}</p>
                  <p>{appointment.selectedService}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
