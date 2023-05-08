'use client'
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface BookingFormProps {
    services: string[];
  }
  
const BookingForm: React.FC<BookingFormProps> = ({ services }) => {
    const [selectedService, setSelectedService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [availableHours, setAvailableHours] = useState<{ time: string; isAvailable: boolean }[]>([]);

  
    const workingHours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
    useEffect(() => {
        if (date) {
          const bookedHours: string[] = ['10:00', '13:00', '15:00']; // Mock data for unavailable hours
      
          const hours = workingHours.map((hour) => {
            return {
              time: hour,
              isAvailable: !bookedHours.includes(hour),
            };
          });
      
          setAvailableHours(hours);
        } else {
          setAvailableHours([]);
        }
      }, [date]);
      
      
      
      
  
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          await axios.post('/api/appointments', { selectedService, date, time });
          alert('Appointment created');
          setDate('');
          setTime('');
        } catch (error) {
          console.error('Error creating appointment:', error);
          alert('Failed to create appointment');
        }
      };
      

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8">
  <h2 className="text-2xl font-semibold mb-4">Book an appointment</h2>

  <div className="mb-4">
    <label htmlFor="service" className="block text-sm font-medium text-gray-700">
      Service
    </label>
    <select
      id="service"
      value={selectedService}
      onChange={(e) => setSelectedService(e.target.value)}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    >
      <option value="">Select a service</option>
      {services.map((service, index) => (
        <option key={index} value={service}>
          {service}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-4">
    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
      Date
    </label>
    <input
      type="date"
      id="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>

  {date && (
    <div className="mb-4">
      <label htmlFor="time" className="block text-sm font-medium text-gray-700">
        Time
      </label>
      <select
  id="time"
  value={time}
  onChange={(e) => setTime(e.target.value)}
  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
>
  <option value="">Select an available hour</option>
  {availableHours.map((hour, index) => (
    <option key={index} value={hour.time} disabled={!hour.isAvailable} style={{ color: hour.isAvailable ? 'inherit' : 'gray' }}>
      {hour.time} {hour.isAvailable ? '' : '(unavailable)'}
    </option>
  ))}
</select>

      
    </div>
  )}

  <button
    type="submit"
    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  >
    Book appointment
  </button>
</form>

  );
};

export default BookingForm;
