'use client'
import React, { useState, useEffect, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import LoginModal from '../LoginModal/LoginModal';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/context/ToastContext';

interface AvailableHour {
  time: string;
  isAvailable: boolean;
  // add more properties if needed
}
interface Service {
  _id: string;
  name: string;
  // add more properties if needed
}

const Landing = () => {

  const { showToast, hideToast } = useToast();
  
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const [time, setTime] = useState('');
  const [availableHours, setAvailableHours] = useState<AvailableHour[]>([]);
  const [servicesData, setServicesData] = useState<Service[]>([]);
  const {user} = useUser()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  
  
  useEffect(() => {
    fetchServices();

  }, []);

  const fetchServices = async () => {
    try {
      const response: AxiosResponse = await axios.get('https://encalbuco.cl/catalogue');
      setServicesData(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    const fetchAvailableHours = async () => {
      try {
        if (date) {
          const dateObject = new Date(date);
          const formattedDate = formatISO(dateObject, { representation: 'date' });
          const response = await axios.get('https://encalbuco.cl/appointments/time-slots', {
            params: {
              date: formattedDate,
              selectedService: selectedService 
            }
          });
          setAvailableHours(response.data);
        } else {
          console.error('Date is null, cannot fetch available hours');
        }
      } catch (error) {
        console.error('Failed to fetch available hours:', error);
      }
    };
  
    if (date && selectedService) {
      fetchAvailableHours();
    }
  }, [date, selectedService]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (date && customerName) {
      openLoginModal(); // Open the LoginModal
    }
  };

  const handleFormSubmitAfterLogin = async () => {
    if (date) {
      const dateObject = new Date(date);
      const formattedDate = formatISO(dateObject, { representation: 'date' });
      
      try {
        await axios.post('https://encalbuco.cl/appointments', {
          selectedService,
          date: formattedDate,
          time,
          customerName,
          user: user?.username // Ensure this is a string value, not an object.
        });
  
        showToast("Appointment created successfully", "success");
  
        setDate(null);
        setTime('');
        setCustomerName('');
        closeLoginModal(); // Close the LoginModal
      } catch (error) {
        showToast("Failed to create appointment", "error");
      }
    } else {
      showToast("Date is not provided", "error");
    }
  };

  

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = e.target.value;
    const selectedSlot = availableHours.find(hour => hour.time === selectedTime);
    if (selectedSlot && !selectedSlot.isAvailable) {
      alert('This time slot is not available. Please select another.');
      setTime(''); // reset selection
    } else {
      setTime(selectedTime);
    }
  };
  return (
    <div className="min-h-screen bg-gray-200 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <header className="text-2xl md:text-4xl font-bold text-blue-500 mb-8 text-center">
            Welcome to Our Service Booking Website!
          </header>
          
          <form onSubmit={handleSubmit} className="w-full">
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={closeLoginModal} 
                onLoginSuccess={handleFormSubmitAfterLogin}
            />
            
            <div className="mb-4">
                <label htmlFor="name" className="block text-xl font-semibold text-gray-700 mb-2">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="mb-8">
                <label htmlFor="service" className="block text-xl font-semibold text-gray-700 mb-2">
                    Service
                </label>
                <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Select a service</option>
                    {servicesData.map((service) => (
                        <option key={service._id} value={service.name}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-8">
                <label htmlFor="date" className="block text-xl font-semibold text-gray-700 mb-2">
                    Date
                </label>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {date && (
                <div className="mb-8">
                    <label htmlFor="time" className="block text-xl font-semibold text-gray-700 mb-2">
                        Time
                    </label>
                    <select
                        id="time"
                        value={time}
                        onChange={handleTimeChange}
                        className="mt-1 block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm text-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

            <div className="mb-8">
                <button
                    type="submit"
                    className="w-full py-3 px-4 text-lg font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Book appointment
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default Landing;
