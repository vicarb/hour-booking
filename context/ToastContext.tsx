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
  const [remainingTime, setRemainingTime] = useState(0);

  const showToast = (message: string, type: string = "success") => {
    setMessage(message);
    setType(type);
    setShow(true);
    setRemainingTime(2000);
  };

  const hideToast = () => {
    setShow(false);
    setMessage("");
    setType("");
    setRemainingTime(0);
  };

  useEffect(() => {
    if (show) {
      const startTime = Date.now();
      const timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime;
        const updatedRemainingTime = 2000 - elapsedTime;
        setRemainingTime(updatedRemainingTime);
        if (updatedRemainingTime <= 0) {
          hideToast();
          clearInterval(timer);
        }
      }, 20); // Increased interval duration to 20ms

      return () => {
        clearInterval(timer);
      };
    }
  }, [show]);

  const progress = (remainingTime / 2000) * 100;

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {show && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '1rem',
            borderRadius: '0.375rem',
            fontSize: '1.5625rem',
            backgroundColor: '#10B981',
            color: 'white',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            zIndex: 9999,
            textAlign: 'center',
          }}
        >
          {message}
          <div
            style={{
              width: `${progress}%`,
              height: '5px',
              backgroundColor: '#fff',
              marginTop: '1rem',
              transition: 'width 100ms ease-out',
            }}
          />
        </div>
      )}
    </ToastContext.Provider>
  );
};