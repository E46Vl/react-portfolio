import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ width = '100%', height = '1rem', className = '' }) => {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius: '0.25rem',
      }}
    />
  );
};

// Post Card Skeleton
export const PostCardSkeleton: React.FC = () => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        {/* Author info */}
        <div className="d-flex align-items-center mb-3">
          <Skeleton width={40} height={40} className="rounded-circle me-3" />
          <div className="flex-grow-1">
            <Skeleton width="30%" height="1rem" className="mb-1" />
            <Skeleton width="20%" height="0.875rem" />
          </div>
        </div>
        
        {/* Title */}
        <Skeleton width="80%" height="1.5rem" className="mb-2" />
        
        {/* Content */}
        <div className="mb-3">
          <Skeleton width="100%" height="1rem" className="mb-1" />
          <Skeleton width="100%" height="1rem" className="mb-1" />
          <Skeleton width="60%" height="1rem" />
        </div>
        
        {/* Actions */}
        <div className="d-flex justify-content-between align-items-center">
          <Skeleton width="80px" height="2rem" />
          <Skeleton width="24px" height="24px" />
        </div>
      </div>
    </div>
  );
};

// User Card Skeleton
export const UserCardSkeleton: React.FC = () => {
  return (
    <div className="card">
      <div className="card-body text-center">
        {/* Avatar */}
        <Skeleton width={80} height={80} className="rounded-circle mx-auto mb-3" />
        
        {/* Name */}
        <Skeleton width="70%" height="1.25rem" className="mb-2 mx-auto" />
        
        {/* Username */}
        <Skeleton width="50%" height="1rem" className="mb-2 mx-auto" />
        
        {/* Email */}
        <Skeleton width="80%" height="0.875rem" className="mb-3 mx-auto" />
        
        {/* Company */}
        <Skeleton width="60%" height="0.875rem" className="mb-3 mx-auto" />
        
        {/* Button */}
        <Skeleton width="80px" height="2rem" className="mx-auto" />
      </div>
    </div>
  );
};

// Post Detail Skeleton
export const PostDetailSkeleton: React.FC = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              {/* Author */}
              <div className="d-flex align-items-center mb-4">
                <Skeleton width={50} height={50} className="rounded-circle me-3" />
                <div className="flex-grow-1">
                  <Skeleton width="40%" height="1.25rem" className="mb-1" />
                  <Skeleton width="30%" height="1rem" />
                </div>
              </div>
              
              {/* Title */}
              <Skeleton width="90%" height="2rem" className="mb-4" />
              
              {/* Content */}
              <div className="mb-4">
                {Array.from({ length: 6 }, (_, index) => (
                  <Skeleton
                    key={index}
                    width={index === 5 ? "70%" : "100%"}
                    height="1rem"
                    className="mb-2"
                  />
                ))}
              </div>
              
              {/* Actions */}
              <div className="d-flex gap-2">
                <Skeleton width="80px" height="2rem" />
                <Skeleton width="80px" height="2rem" />
                <Skeleton width="32px" height="32px" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <Skeleton width="50%" height="1.25rem" />
            </div>
            <div className="card-body">
              {Array.from({ length: 3 }, (_, index) => (
                <div key={index} className="mb-3">
                  <div className="d-flex align-items-start mb-2">
                    <Skeleton width={32} height={32} className="rounded-circle me-2" />
                    <div className="flex-grow-1">
                      <Skeleton width="60%" height="1rem" className="mb-1" />
                      <Skeleton width="40%" height="0.875rem" />
                    </div>
                  </div>
                  <Skeleton width="100%" height="3rem" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// List Skeleton (for multiple items)
export const ListSkeleton: React.FC<{ count?: number; component: React.ComponentType }> = ({
  count = 3,
  component: Component,
}) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <Component key={index} />
      ))}
    </>
  );
};

export default Skeleton; 