'use client'
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import LoginModal from '../LoginModal/LoginModal';
import { useUser } from '@/context/UserContext';

const Landing = () => {
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [availableHours, setAvailableHours] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const {user} = useUser()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response: AxiosResponse = await axios.get('http://localhost:3000/catalogue');
      setServicesData(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    const fetchAvailableHours = async () => {
      try {
        const formattedDate = formatISO(date, { representation: 'date' });
        const response = await axios.get('http://localhost:3000/appointments/time-slots', {
          params: {
            date: formattedDate,
            selectedService: selectedService 
          }
        });
        setAvailableHours(response.data);
      } catch (error) {
        console.error('Failed to fetch available hours:', error);
      }
    };
  
    if (date && selectedService) {
      fetchAvailableHours();
    }
  }, [date, selectedService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (date && customerName) {
      openLoginModal();
    }
  };

  const handleFormSubmitAfterLogin = async () => {
    const formattedDate = formatISO(date, { representation: 'date' });
    
    try {
      await axios.post('http://localhost:3000/appointments', {
        selectedService,
        date: formattedDate,
        time,
        customerName,
        user

      });
      alert('Appointment created');
      
      setDate(null);
      setTime('');
      setCustomerName('');
      closeLoginModal();
    } catch (error) {
      console.error('Error creating appointment:', error);
      alert('Failed to create appointment');
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const selectedSlot = availableHours.find(hour => hour.time === selectedTime);
    if (selectedSlot && !selectedSlot.isAvailable) {
      alert('This time slot is not available. Please select another.');
      setTime('');
    } else {
      setTime(selectedTime);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <header className="text-4xl font-bold text-blue-500 mb-8">
            Welcome to Our Service Booking Website!
        </header>
        
        <section className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="font-semibold text-2xl text-gray-800 mb-4">
                Book a Service
            </h2>
            
            <form onSubmit={handleSubmit} className="w-full">
                <LoginModal 
                    isOpen={isLoginModalOpen} 
                    onClose={closeLoginModal} 
                    onLoginSuccess={handleFormSubmitAfterLogin}
                />
                
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

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
                        {servicesData.map((service) => (
                            <option key={service._id} value={service.name}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                        Date
                    </label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
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
                            onChange={handleTimeChange}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="">Select an available hour</option>
                            {availableHours.map((hour, index) => (
                                <option key={index} value={hour.time} style={{ color: hour.isAvailable ? 'inherit' : 'gray' }}>
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
        </section>
    </div>
);

};

export default Landing;
