import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'light' | 'dark';
  text?: string;
  center?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'primary',
  text = 'Loading...',
  center = false,
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg',
  };

  const containerClasses = center
    ? 'd-flex justify-content-center align-items-center'
    : 'd-flex align-items-center';

  return (
    <div className={containerClasses}>
      <div
        className={`spinner-border text-${variant} ${sizeClasses[size]}`}
        role="status"
        aria-hidden="true"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && (
        <span className="ms-2">
          {text}
        </span>
      )}
    </div>
  );
};

// Full page loader
export const FullPageLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">{text}</p>
      </div>
    </div>
  );
};

// Inline loader for buttons
export const ButtonSpinner: React.FC = () => {
  return (
    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
      <span className="visually-hidden">Loading...</span>
    </span>
  );
};

export default LoadingSpinner; 