import Image from 'next/image';
import BookingForm from '@/components/BookingForm/BookingForm';
import Head from 'next/head';
import Dashboard from '@/components/Dashboard/Dashboard';
import { Register } from '@/components/Register/Register';
import { Login } from '@/components/Login/Login';



export default function Home() {
  return (
    <div className="container mx-auto px-4">
    <Head>
      <title>Appointment Booking App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="mt-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Appointment Booking App
      </h1>
      <BookingForm  />
      <Dashboard/>
      <Login/>
      <Register/>
    </main>
  </div>
  )
}
