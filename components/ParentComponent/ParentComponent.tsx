'use client'
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import LoginModal from '../LoginModal/LoginModal';
const ParentComponent = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <>
      <Navbar onLoginClick={openLoginModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      {/* other components */}
    </>
  );
};

export default ParentComponent;
