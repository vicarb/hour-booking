
import Image from 'next/image';
import BookingForm from '@/components/BookingForm/BookingForm';
import Head from 'next/head';
import Dashboard from '@/components/Dashboard/Dashboard';
import { Register } from '@/components/Register/Register';
import { Login } from '@/components/Login/Login';
import Landing from '@/components/Landing/Landing';
import Navbar from '@/components/Navbar/Navbar';


export default function Home() {
  return (
    <div>
    <Head>
      <title>Appointment Booking App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar/>


      <Landing/>
      <BookingForm  />
      <Dashboard/>
      <Login/>
      <Register/>
    </div>
  
  )
}
