import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/UI/Icon';
import { useUsers } from '../features/users/services/usersApi';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleUserBookmark } from '../store/slices/bookmarksSlice';
import { UserCardSkeleton } from '../components/UI/SkeletonLoader';
import { ErrorMessage, EmptyState } from '../components/UI/ErrorBoundary';
import UserCard from '../components/UI/UserCard';
import { getAvatarUrl } from '../utils/helpers';
import { User } from '../types/api';

const UsersList: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookmarkedUsers = useAppSelector((state: any) => state.bookmarks.bookmarkedUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query
  const debouncedSetSearch = useCallback(
    (query: string) => {
      const timeoutId = setTimeout(() => setDebouncedSearch(query), 300);
      return () => clearTimeout(timeoutId);
    },
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchQuery);
  }, [searchQuery, debouncedSetSearch]);

  // Fetch users with search
  const {
    data: users,
    isLoading,
    isError,
    refetch,
  } = useUsers(debouncedSearch);

  const handleBookmarkToggle = (userId: number) => {
    dispatch(toggleUserBookmark(userId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedSearch('');
  };

  if (isError) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="Failed to load users"
          message="Unable to fetch users. Please check your connection and try again."
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="h2 mb-0">Users</h1>
              <p className="text-muted mb-0">
                Connect with amazing people in our community
              </p>
            </div>
            <div className="d-flex gap-2">
              {bookmarkedUsers.length > 0 && (
                <Link to="/bookmarks" className="btn btn-outline-primary">
                  <Icon name="FiBookmark" className="me-1" />
                  Bookmarked ({bookmarkedUsers.length})
                </Link>
              )}
            </div>
          </div>

          {/* Search Bar */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search users by name, username, email, or company..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={clearSearch}
                  >
                    Clear
                  </button>
                )}
              </div>
              {debouncedSearch && (
                <small className="text-muted">
                  Searching for: "{debouncedSearch}"
                </small>
              )}
            </div>
          </div>

          {/* Users Grid */}
          <div className="row">
            {/* Loading Skeleton */}
            {isLoading && (
              <>
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                    <UserCardSkeleton />
                  </div>
                ))}
              </>
            )}

            {/* Users */}
            {!isLoading && users && users.length > 0 && (
              <>
                {users.map((user) => {
                  const isBookmarked = bookmarkedUsers.includes(user.id);

                  return (
                    <div key={user.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                      <UserCard
                        user={user}
                        isBookmarked={isBookmarked}
                        onBookmarkToggle={() => handleBookmarkToggle(user.id)}
                      />
                    </div>
                  );
                })}
              </>
            )}

            {/* Empty State */}
            {!isLoading && (!users || users.length === 0) && (
              <div className="col-12">
                <EmptyState
                  title={debouncedSearch ? 'No users found' : 'No users available'}
                  message={
                    debouncedSearch
                      ? `No users match your search for "${debouncedSearch}"`
                      : 'There are no users to display at the moment.'
                  }
                  icon={<Icon name="FiUser" size={48} />}
                  action={
                    debouncedSearch ? (
                      <button className="btn btn-primary" onClick={clearSearch}>
                        Clear Search
                      </button>
                    ) : undefined
                  }
                />
              </div>
            )}
          </div>

          {/* Results Summary */}
          {!isLoading && users && users.length > 0 && (
            <div className="text-center py-3">
              <p className="text-muted">
                Showing {users.length} user{users.length !== 1 ? 's' : ''}
                {debouncedSearch && ` matching "${debouncedSearch}"`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList; 