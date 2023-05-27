'use client'
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import LoginModal from '../LoginModal/LoginModal';
import { RegisterModal } from '../RegisterModal/RegisterModal';
import { useUser } from '@/context/UserContext'; // Import useUser from the context file
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';


const ParentComponent = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const {user, setUser} = useUser(); // use the useUser hook
  const {showToast, hideToast} = useToast();

  const router = useRouter();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const handleLoginSuccess = () => {
    showToast("Login Successful"); // Show toast
    setIsLoginModalOpen(false);
  
    setTimeout(() => {
      hideToast(); // Hide the toast after a certain duration
      router.push("/profile"); // Redirect to the profile page
    }, 1000); // Wait for 2 seconds (adjust the duration as needed)
  };
  

  return (
    <>
      <Navbar onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onLoginSuccess={handleLoginSuccess} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
      {/* other components */}
    </>
  );
};

export default ParentComponent;
