import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/UI/Icon';
import { useAppSelector } from '../hooks/redux';
import { usePosts } from '../features/posts/services/postsApi';
import { useUsers } from '../features/users/services/usersApi';
import { PostCardSkeleton, UserCardSkeleton } from '../components/UI/SkeletonLoader';
import { EmptyState } from '../components/UI/ErrorBoundary';
import { getAvatarUrl, truncateText } from '../utils/helpers';

const Bookmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'users'>('posts');
  const bookmarkedPosts = useAppSelector((state: any) => state.bookmarks.bookmarkedPosts);
  const bookmarkedUsers = useAppSelector((state: any) => state.bookmarks.bookmarkedUsers);

  // Fetch all posts and users to filter bookmarked ones
  const { data: allPosts, isLoading: postsLoading } = usePosts();
  const { data: allUsers, isLoading: usersLoading } = useUsers();

  // Filter bookmarked items
  const bookmarkedPostsData = allPosts?.filter(post => 
    bookmarkedPosts.includes(post.id)
  ) || [];
  
  const bookmarkedUsersData = allUsers?.filter(user => 
    bookmarkedUsers.includes(user.id)
  ) || [];

  const totalBookmarks = bookmarkedPosts.length + bookmarkedUsers.length;

  if (totalBookmarks === 0) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <EmptyState
              title="No bookmarks yet"
              message="Start bookmarking posts and users to see them here."
              icon={<Icon name="FiBookmark" size={64} />}
              action={
                <div className="d-flex gap-2 justify-content-center">
                  <Link to="/posts" className="btn btn-primary">
                    Browse Posts
                  </Link>
                  <Link to="/users" className="btn btn-outline-primary">
                    Browse Users
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-0">Bookmarks</h1>
          <p className="text-muted mb-0">
            Your saved posts and users ({totalBookmarks} total)
          </p>
        </div>
        <div className="d-flex gap-2">
          <span className="badge bg-primary fs-6">
            {bookmarkedPosts.length} posts
          </span>
          <span className="badge bg-secondary fs-6">
            {bookmarkedUsers.length} users
          </span>
        </div>
      </div>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4" id="bookmarksTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'posts' ? 'active' : ''}`}
            id="posts-tab"
            data-bs-toggle="tab"
            data-bs-target="#posts"
            type="button"
            role="tab"
            aria-controls="posts"
            aria-selected={activeTab === 'posts'}
            onClick={() => setActiveTab('posts')}
          >
            <Icon name="FiBookmark" className="me-1" />
            Posts ({bookmarkedPosts.length})
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
            id="users-tab"
            data-bs-toggle="tab"
            data-bs-target="#users"
            type="button"
            role="tab"
            aria-controls="users"
            aria-selected={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          >
            <Icon name="FiUser" className="me-1" />
            Users ({bookmarkedUsers.length})
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content" id="bookmarksTabContent">
        {/* Posts Tab */}
        <div 
          className={`tab-pane fade ${activeTab === 'posts' ? 'show active' : ''}`}
          id="posts"
          role="tabpanel"
          aria-labelledby="posts-tab"
        >
          {postsLoading ? (
            <div className="row">
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="col-md-6 col-lg-4 mb-4">
                  <PostCardSkeleton />
                </div>
              ))}
            </div>
          ) : bookmarkedPostsData.length > 0 ? (
            <div className="row">
              {bookmarkedPostsData.map((post) => (
                <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 card-hover">
                    <div className="card-body d-flex flex-column">
                      {/* Post Content */}
                      <h5 className="card-title">
                        <Link 
                          to={`/posts/${post.id}`}
                          className="text-decoration-none"
                        >
                          {truncateText(post.title, 80)}
                        </Link>
                      </h5>
                      
                      <p className="card-text text-muted flex-grow-1">
                        {truncateText(post.body, 120)}
                      </p>

                      {/* Actions */}
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <Link 
                          to={`/posts/${post.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Read More
                          <Icon name="FiExternalLink" className="ms-1" />
                        </Link>
                        
                        <small className="text-muted">
                          Post #{post.id}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No bookmarked posts"
              message="You haven't bookmarked any posts yet."
              action={
                <Link to="/posts" className="btn btn-primary">
                  Browse Posts
                </Link>
              }
            />
          )}
        </div>

        {/* Users Tab */}
        <div 
          className={`tab-pane fade ${activeTab === 'users' ? 'show active' : ''}`}
          id="users"
          role="tabpanel"
          aria-labelledby="users-tab"
        >
          {usersLoading ? (
            <div className="row">
              {Array.from({ length: 8 }, (_, index) => (
                <div key={index} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                  <UserCardSkeleton />
                </div>
              ))}
            </div>
          ) : bookmarkedUsersData.length > 0 ? (
            <div className="row">
              {bookmarkedUsersData.map((user) => (
                <div key={user.id} className="col-md-6 col-lg-4 col-xl-3 mb-4">
                  <div className="card h-100 card-hover">
                    <div className="card-body text-center d-flex flex-column">
                      {/* Avatar */}
                      <div className="mb-3">
                        <img
                          src={getAvatarUrl(user.email, 80)}
                          alt={user.name}
                          className="rounded-circle"
                          width="80"
                          height="80"
                          loading="lazy"
                        />
                      </div>

                      {/* User Info */}
                      <div className="mb-3 flex-grow-1">
                        <h5 className="card-title mb-1">
                          <Link 
                            to={`/users/${user.id}`}
                            className="text-decoration-none"
                          >
                            {user.name}
                          </Link>
                        </h5>
                        <p className="text-muted small mb-2">@{user.username}</p>
                        
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <Icon name="FiMail" className="me-2 text-muted" size={14} />
                          <small className="text-muted text-truncate">{user.email}</small>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <Icon name="FiMapPin" className="me-2 text-muted" size={14} />
                          <small className="text-muted">{user.address.city}</small>
                        </div>
                        
                        <div className="d-flex align-items-center justify-content-center mb-2">
                          <Icon name="FiGlobe" className="me-2 text-muted" size={14} />
                          <small className="text-muted text-truncate">{user.company.name}</small>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Link
                        to={`/users/${user.id}`}
                        className="btn btn-outline-primary btn-sm mt-auto"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No bookmarked users"
              message="You haven't bookmarked any users yet."
              action={
                <Link to="/users" className="btn btn-primary">
                  Browse Users
                </Link>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks; 