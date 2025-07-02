import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Layout: React.FC<LayoutProps> = ({ onSearch, searchQuery }) => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navigation */}
      <Navigation onSearch={onSearch} searchQuery={searchQuery} />

      {/* Main Content */}
      <main className="flex-grow-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bs-body-bg)',
            color: 'var(--bs-body-color)',
            border: '1px solid var(--bs-border-color)',
          },
          success: {
            iconTheme: {
              primary: 'var(--bs-success)',
              secondary: 'var(--bs-light)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--bs-danger)',
              secondary: 'var(--bs-light)',
            },
          },
        }}
      />
    </div>
  );
};

export default Layout; 