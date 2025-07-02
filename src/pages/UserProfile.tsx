import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icon from '../components/UI/Icon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleUserBookmark } from '../store/slices/bookmarksSlice';
import { useUser } from '../features/users/services/usersApi';
import { useUserPosts } from '../features/posts/services/postsApi';
import { UserCardSkeleton } from '../components/UI/SkeletonLoader';
import { ErrorMessage, EmptyState } from '../components/UI/ErrorBoundary';
import { getAvatarUrl, formatDate } from '../utils/helpers';
import { Post } from '../types/api';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookmarkedUsers = useAppSelector((state: any) => state.bookmarks.bookmarkedUsers);
  
  const userId = parseInt(id!);

  // Fetch user data
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useUser(userId);

  // Fetch user's posts
  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
  } = useUserPosts(userId);

  const isBookmarked = bookmarkedUsers.includes(userId);

  const handleBookmarkToggle = () => {
    dispatch(toggleUserBookmark(userId));
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  if (userLoading) {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-4">
            <UserCardSkeleton />
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="skeleton mb-3" style={{ width: '60%', height: '2rem' }} />
                <div className="skeleton mb-2" style={{ width: '100%', height: '1rem' }} />
                <div className="skeleton mb-2" style={{ width: '80%', height: '1rem' }} />
                <div className="skeleton mb-2" style={{ width: '90%', height: '1rem' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="Failed to load user"
          message="Unable to fetch user details. Please check your connection and try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="User not found"
          message="The user you're looking for doesn't exist or has been removed."
          onRetry={() => navigate('/users')}
        />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/users" className="text-decoration-none">Users</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {user.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* User Info Card */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              {/* Avatar */}
              <div className="position-relative mb-3">
                <img
                  src={getAvatarUrl(user.email, 120)}
                  alt={user.name}
                  className="rounded-circle"
                  width="120"
                  height="120"
                  loading="lazy"
                />
                <button
                  className={`bookmark-btn position-absolute top-0 end-0 btn btn-sm rounded-circle ${
                    isBookmarked ? 'btn-warning' : 'btn-outline-secondary'
                  }`}
                  onClick={handleBookmarkToggle}
                  aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  style={{ transform: 'translate(25%, -25%)' }}
                >
                  <Icon name="FiBookmark" />
                </button>
              </div>

              {/* User Details */}
              <h3 className="card-title mb-2">{user.name}</h3>
              <p className="text-muted mb-3">@{user.username}</p>
              
              {/* Contact Info */}
              <div className="text-start mb-3">
                <div className="d-flex align-items-center mb-2">
                  <Icon name="FiMail" className="me-2 text-muted" size={16} />
                  <small className="text-muted">{user.email}</small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Icon name="FiMapPin" className="me-2 text-muted" size={16} />
                  <small className="text-muted">
                    {user.address.street}, {user.address.city}, {user.address.zipcode}
                  </small>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Icon name="FiGlobe" className="me-2 text-muted" size={16} />
                  <small className="text-muted">{user.company.name}</small>
                </div>
              </div>

              {/* Stats */}
              <div className="row text-center mb-3">
                <div className="col-4">
                  <div className="border-end">
                    <h5 className="mb-0">{posts?.length || 0}</h5>
                    <small className="text-muted">Posts</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-end">
                    <h5 className="mb-0">0</h5>
                    <small className="text-muted">Followers</small>
                  </div>
                </div>
                <div className="col-4">
                  <h5 className="mb-0">0</h5>
                  <small className="text-muted">Following</small>
                </div>
              </div>

              {/* Actions */}
              <div className="d-grid gap-2">
                <button className="btn btn-primary">
                  Follow
                </button>
                <button className="btn btn-outline-secondary">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div className="col-lg-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Posts by {user.name}</h5>
              <span className="badge bg-primary">{posts?.length || 0} posts</span>
            </div>
            <div className="card-body">
              {postsLoading ? (
                <div>
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="border-bottom pb-3 mb-3">
                      <div className="skeleton mb-2" style={{ width: '70%', height: '1.5rem' }} />
                      <div className="skeleton mb-1" style={{ width: '100%', height: '1rem' }} />
                      <div className="skeleton mb-1" style={{ width: '90%', height: '1rem' }} />
                      <div className="skeleton" style={{ width: '60%', height: '1rem' }} />
                    </div>
                  ))}
                </div>
              ) : postsError ? (
                <div className="text-center py-3">
                  <p className="text-muted">Failed to load posts</p>
                </div>
              ) : posts && posts.length > 0 ? (
                <div>
                  {posts.map((post: Post) => (
                    <div key={post.id} className="border-bottom pb-3 mb-3">
                      <h6 className="mb-2">
                        <Link 
                          to={`/posts/${post.id}`}
                          className="text-decoration-none"
                        >
                          {post.title}
                        </Link>
                      </h6>
                      <p className="text-muted mb-2">
                        {post.body.length > 150 
                          ? `${post.body.substring(0, 150)}...` 
                          : post.body
                        }
                      </p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          Post #{post.id} • {formatDate(new Date())}
                        </small>
                        <Link 
                          to={`/posts/${post.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Read More
                          <Icon name="FiExternalLink" className="ms-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No posts yet"
                  message={`${user.name} hasn't published any posts yet.`}
                  icon={<Icon name="FiUser" size={48} />}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 