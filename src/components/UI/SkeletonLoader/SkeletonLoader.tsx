import React from 'react';
import './SkeletonLoader.scss';

interface SkeletonLoaderProps {
  count?: number;
  component?: React.ComponentType<any>;
}

interface PostCardSkeletonProps {}

interface UserCardSkeletonProps {}

interface PostDetailSkeletonProps {}

interface ListSkeletonProps {
  count: number;
  component: React.ComponentType<any>;
}

export const PostCardSkeleton: React.FC<PostCardSkeletonProps> = () => (
  <div className="card h-100">
    <div className="card-body d-flex flex-column">
      <div className="d-flex align-items-center mb-3">
        <div className="skeleton-loader__item skeleton-loader__avatar me-2"></div>
        <div className="me-auto">
          <div className="skeleton-loader__item skeleton-loader__title mb-1"></div>
          <div className="skeleton-loader__item skeleton-loader__subtitle"></div>
        </div>
      </div>
      <div className="skeleton-loader__item skeleton-loader__post-title mb-2"></div>
      <div className="skeleton-loader__item skeleton-loader__post-body mb-2"></div>
      <div className="skeleton-loader__item skeleton-loader__post-body mb-2"></div>
      <div className="d-flex justify-content-between align-items-center mt-auto">
        <div className="skeleton-loader__item" style={{ width: '100px', height: '32px' }}></div>
        <div className="skeleton-loader__item skeleton-loader__meta"></div>
      </div>
    </div>
  </div>
);

export const UserCardSkeleton: React.FC<UserCardSkeletonProps> = () => (
  <div className="card h-100">
    <div className="card-body text-center d-flex flex-column">
      <div className="position-relative mb-3">
        <div className="skeleton-loader__item skeleton-loader__user-avatar mx-auto"></div>
      </div>
      <div className="skeleton-loader__item skeleton-loader__user-name mb-2"></div>
      <div className="skeleton-loader__item skeleton-loader__subtitle mb-3"></div>
      <div className="mb-3 flex-grow-1">
        <div className="skeleton-loader__item skeleton-loader__user-info mb-2"></div>
        <div className="skeleton-loader__item skeleton-loader__user-info mb-2"></div>
        <div className="skeleton-loader__item skeleton-loader__user-info mb-2"></div>
      </div>
      <div className="skeleton-loader__item" style={{ width: '100%', height: '32px' }}></div>
    </div>
  </div>
);

export const PostDetailSkeleton: React.FC<PostDetailSkeletonProps> = () => (
  <div className="row">
    <div className="col-lg-8">
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center mb-3">
            <div className="skeleton-loader__item skeleton-loader__avatar me-3"></div>
            <div className="me-auto">
              <div className="skeleton-loader__item skeleton-loader__title mb-1"></div>
              <div className="skeleton-loader__item skeleton-loader__subtitle"></div>
            </div>
          </div>
          <div className="skeleton-loader__item skeleton-loader__post-title mb-3"></div>
          <div className="skeleton-loader__item skeleton-loader__post-body mb-2"></div>
          <div className="skeleton-loader__item skeleton-loader__post-body mb-2"></div>
          <div className="skeleton-loader__item skeleton-loader__post-body mb-2"></div>
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <div className="skeleton-loader__item skeleton-loader__meta"></div>
            <div className="d-flex gap-2">
              <div className="skeleton-loader__item" style={{ width: '80px', height: '32px' }}></div>
              <div className="skeleton-loader__item" style={{ width: '80px', height: '32px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="card">
        <div className="card-header">
          <div className="skeleton-loader__item skeleton-loader__title"></div>
        </div>
        <div className="card-body">
          <div className="skeleton-loader__item skeleton-loader__user-info mb-2"></div>
          <div className="skeleton-loader__item skeleton-loader__user-info mb-2"></div>
          <div className="skeleton-loader__item skeleton-loader__user-info mb-2"></div>
        </div>
      </div>
    </div>
  </div>
);

export const ListSkeleton: React.FC<ListSkeletonProps> = ({ count, component: Component }) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <div key={index} className="col-md-6 col-lg-4 mb-4">
        <Component />
      </div>
    ))}
  </>
);

export default {
  PostCardSkeleton,
  UserCardSkeleton,
  PostDetailSkeleton,
  ListSkeleton,
}; 