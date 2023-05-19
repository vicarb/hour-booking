'use client'
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import LoginModal from '../LoginModal/LoginModal';

import { RegisterModal } from '../RegisterModal/RegisterModal';

const ParentComponent = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  return (
    <>
      <Navbar onLoginClick={openLoginModal} onRegisterClick={openRegisterModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <RegisterModal isOpen={isRegisterModalOpen} onClose={closeRegisterModal} />
      {/* other components */}
    </>
  );
};

export default ParentComponent;
