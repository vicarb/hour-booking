'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';


interface Appointment {
  _id: string;
  date: string;
  time: string;
  selectedService: string;
  customerName: string;
  user: string;
}

const Dashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // Sort appointments by date, from soonest to latest
  const sortedAppointments = appointments.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  // Group sorted appointments by date
  const groupedAppointments = sortedAppointments.reduce((grouped: {[key: string]: Appointment[]}, appointment) => {
    const date = dayjs(appointment.date).format('YYYY-MM-DD');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(appointment);
    return grouped;
  }, {});
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Appointments Dashboard</h2>
      <div className="grid grid-cols-7 gap-4">
        {/* Render a box for each day */}
        {Object.keys(groupedAppointments).map((date) => (
          <div key={date} className="col-span-1">
            <h3 className="text-lg font-semibold mb-2">{dayjs(date).format('MMMM D, YYYY')}</h3>
            {groupedAppointments[date].map((appointment) => (
              <div key={appointment._id} className="border rounded shadow p-4 mb-4">
                <p>
                  <strong>Time:</strong> {appointment.time}
                </p>
                <p>
                  <strong>Service:</strong> {appointment.selectedService}
                </p>
                <p>
                  <strong>Customer:</strong> {appointment.customerName}
                </p>
                <p>
                  <strong>User:</strong> {appointment.user}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
