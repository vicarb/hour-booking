
'use client'
import { useState, useCallback } from 'react';
import ToastContext from '@/context/ToastContext';

const ToastProvider = ({ children }) => {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
          {toastMessage}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
