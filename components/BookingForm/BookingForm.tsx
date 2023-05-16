'use client'
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import LoginModal from '../LoginModal/LoginModal';
import { useUser } from '@/context/UserContext';

interface BookingFormProps {
    services: string[];
}

const BookingForm: React.FC<BookingFormProps> = ({ services }) => {
  const [customerName, setCustomerName] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableHours, setAvailableHours] = useState<{ time: string; isAvailable: boolean }[]>([]);
  const [servicesData, setServicesData] = useState<Array<{ _id: string; name: string; description: string; duration: number }>>([]);

  // Add isLoginModalOpen and setIsLoginModalOpen state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // LoginModal open and close handlers
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (date && customerName) {
      openLoginModal(); // Open the LoginModal
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

      });
      alert('Appointment created');
      setDate(null);
      setTime('');
      setCustomerName('');
      closeLoginModal(); // Close the LoginModal
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
      setTime(''); // reset selection
    } else {
      setTime(selectedTime);
    }
  };
  return (
    
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8">
       <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal} 
        onLoginSuccess={handleFormSubmitAfterLogin} // Pass the form submission function to the LoginModal
      />
  <h2 className="text-2xl font-semibold mb-4">Book an appointment</h2>

  <div className="mb-4">
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
  onChange={(date: Date | null) => setDate(date)}
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

  );

  // Other code remains the same

  // Return JSX in the next response
};

export default BookingForm;