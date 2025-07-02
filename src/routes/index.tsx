import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { FullPageLoader } from '../components/UI/LoadingSpinner';
import { NotFound } from '../components/UI/ErrorBoundary';
import ErrorBoundary from '../components/UI/ErrorBoundary';

// Lazy load pages for code splitting
const Home = React.lazy(() => import('../pages/Home'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const PostsList = React.lazy(() => import('../pages/PostsList'));
const PostDetail = React.lazy(() => import('../pages/PostDetail'));
const CreatePost = React.lazy(() => import('../pages/CreatePost'));
const EditPost = React.lazy(() => import('../pages/EditPost'));
const UsersList = React.lazy(() => import('../pages/UsersList'));
const UserProfile = React.lazy(() => import('../pages/UserProfile'));
const Bookmarks = React.lazy(() => import('../pages/Bookmarks'));

// Create a wrapper component for lazy loaded routes
const LazyWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<FullPageLoader />}>
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  </Suspense>
);



// Create router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <LazyWrapper>
            <Home />
          </LazyWrapper>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <LazyWrapper>
            <Dashboard />
          </LazyWrapper>
        ),
      },
      {
        path: 'posts',
        element: (
          <LazyWrapper>
            <PostsList />
          </LazyWrapper>
        ),
      },
      {
        path: 'users',
        element: (
          <LazyWrapper>
            <UsersList />
          </LazyWrapper>
        ),
      },
      // Placeholder routes for future implementation
      {
        path: 'posts/:id',
        element: (
          <LazyWrapper>
            <PostDetail />
          </LazyWrapper>
        ),
      },
      {
        path: 'users/:id',
        element: (
          <LazyWrapper>
            <UserProfile />
          </LazyWrapper>
        ),
      },
      {
        path: 'posts/new',
        element: (
          <LazyWrapper>
            <CreatePost />
          </LazyWrapper>
        ),
      },
      {
        path: 'posts/:id/edit',
        element: (
          <LazyWrapper>
            <EditPost />
          </LazyWrapper>
        ),
      },
      {
        path: 'bookmarks',
        element: (
          <LazyWrapper>
            <Bookmarks />
          </LazyWrapper>
        ),
      },
      // Catch all route - redirect to home
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

// Router Provider Component
const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter; 