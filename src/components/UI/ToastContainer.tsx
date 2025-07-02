import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useAppSelector } from '../../hooks/redux';

const ToastContainer: React.FC = () => {
  const isDarkMode = useAppSelector((state: any) => state.theme.isDarkMode);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: isDarkMode ? '#2d2d2d' : '#fff',
          color: isDarkMode ? '#fff' : '#333',
          border: `1px solid ${isDarkMode ? '#404040' : '#e0e0e0'}`,
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontSize: '14px',
          padding: '12px 16px',
        },
        success: {
          iconTheme: {
            primary: '#28a745',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#dc3545',
            secondary: '#fff',
          },
        },
        loading: {
          iconTheme: {
            primary: '#007bff',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastContainer; 