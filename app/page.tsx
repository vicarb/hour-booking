
import Image from 'next/image';
import BookingForm from '@/components/BookingForm/BookingForm';
import Head from 'next/head';
import Landing from '@/components/Landing/Landing';
import Navbar from '@/components/Navbar/Navbar';
import ParentComponent from '@/components/ParentComponent/ParentComponent';



export default function Home() {
  return (
    <div>
    <Head>
      <title>Appointment Booking App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
   <ParentComponent/>

      <Landing/>
      <BookingForm  />
      
    </div>
  
  )
}
