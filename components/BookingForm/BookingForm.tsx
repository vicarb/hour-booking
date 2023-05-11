'use client'
import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import DatePicker from 'react-datepicker';
import { formatISO } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { Listbox } from '@headlessui/react';

interface BookingFormProps {
    services: string[];
  }
  
const BookingForm: React.FC<BookingFormProps> = ({ services }) => {
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [availableHours, setAvailableHours] = useState<{ time: string; isAvailable: boolean }[]>([]);
  const [servicesData, setServicesData] = useState<Array<{ _id: string; name: string; description: string; duration: number }>>([]);

  

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
            selectedService: selectedService // add this line
          }
        });
        setAvailableHours(response.data);
      } catch (error) {
        console.error('Failed to fetch available hours:', error);
      }
    };
  
    if (date && selectedService) { // add selectedService check here
      fetchAvailableHours();
    }
  }, [date, selectedService]); // add selectedService to dependency array
  
  

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (date) {
      const formattedDate = formatISO(date, { representation: 'date' });
  
      try {
        await axios.post('http://localhost:3000/appointments', { selectedService, date: formattedDate, time });
        alert('Appointment created');
        setDate(null);
        setTime('');
      } catch (error) {
        console.error('Error creating appointment:', error);
        alert('Failed to create appointment');
      }
    }
  };
  
  const handleTimeChange = (hour) => {
    const selectedTime = hour.time;
    const selectedSlot = availableHours.find((hour) => hour.time === selectedTime);
    if (selectedSlot && !selectedSlot.isAvailable) {
      alert('This time slot is not available. Please select another.');
      setTime(''); // reset selection
    } else {
      setTime(selectedTime);
    }
  };
      
      

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-8">
      <h2 className="text-2xl font-semibold mb-4">Book an appointment</h2>

      <div className="mb-4">
        <label htmlFor="service" className="block text-sm font-medium text-gray-700">
          Service
        </label>
        <Listbox value={selectedService} onChange={(service) => setSelectedService(service)}>
          <div className="relative">
            <Listbox.Button className="z-10 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default sm:text-sm focus:outline-none">
              {selectedService ? selectedService.name : 'Select a service'}
            </Listbox.Button>
            <Listbox.Options className="z-10 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {servicesData.map((service) => (
                <Listbox.Option key={service._id} value={service}>
                  {({ selected, active }) => (
                    <div className={`cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-white bg-blue-600' : 'text-gray-900'}`}>
                      <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{service.name}</span>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
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
          <Listbox value={time} onChange={(hour) => handleTimeChange(hour)}>
            <div className="relative">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg cursor-default sm:text-sm focus:outline-none">
                {time ? time.time : 'Select an available hour'}
              </Listbox.Button>
              <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {availableHours.map((hour, index) => (
                  <Listbox.Option key={index} value={hour}>
                    {({ selected, active }) => (
                      <div className={`cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-white bg-blue-600' : 'text-gray-900'}`}>
                        <span className={`block truncate ${selected ? 'font-semibold' : 'font-normal'}`}>{hour.time} {hour.isAvailable ? '' : '(unavailable)'}</span>
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
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
