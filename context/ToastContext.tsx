'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ToastContextType = {
  showToast: (message: string, type?: string) => void;
  hideToast: () => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastContextProvider");
  }
  return context;
}

type ToastContextProviderProps = {
  children: ReactNode;
};

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [show, setShow] = useState(false);
  
    const showToast = (message: string, type: string = "success") => {
      console.log("Show toast called with", { message, type }); 
      setMessage(message);
      setType(type);
      setShow(true);
    };
    
  
    const hideToast = () => {
      setShow(false);
    };
  
    useEffect(() => {
      console.log({ message, type, show }); // Add this line here
      if (show) {
        const timer = setTimeout(() => {
          hideToast();
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [show, message, type]);
  
    return (
      <ToastContext.Provider value={{ showToast, hideToast }}>
        {children}
        {show && (
          <div 
            style={{
              position: 'fixed', 
              top: '50%', 
              left: '50%', 
              width: '80%', // Use percentage to be responsive
              maxWidth: '400px', // Limit maximum width
              transform: 'translate(-50%, -50%)',
              padding: '1rem', 
              borderRadius: '0.375rem', 
              fontSize: '1.25rem', 
              backgroundColor: '#10B981', // Tailwind's green-600
              color: 'white', 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // Tailwind's shadow-2xl
              zIndex: 9999,
              textAlign: 'center', // Center text
            }}
          >
            {message}
          </div>
        )}
        
        
        
        
        
        
      </ToastContext.Provider>
    );
  };