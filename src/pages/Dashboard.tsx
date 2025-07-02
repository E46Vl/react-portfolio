import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/UI/Icon';
import { usePosts } from '../features/posts/services/postsApi';
import { useUsers } from '../features/users/services/usersApi';
import { useAppSelector } from '../hooks/redux';
import StatsCard from '../components/UI/StatsCard';
import { PostCardSkeleton, UserCardSkeleton } from '../components/UI/SkeletonLoader';
import { getAvatarUrl, truncateText } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const bookmarkedPosts = useAppSelector((state: any) => state.bookmarks.bookmarkedPosts);
  const bookmarkedUsers = useAppSelector((state: any) => state.bookmarks.bookmarkedUsers);
  
  const { data: posts, isLoading: postsLoading } = usePosts();
  const { data: users, isLoading: usersLoading } = useUsers();

  // Get recent posts (last 5)
  const recentPosts = posts?.slice(0, 5) || [];
  
  // Get recent users (last 4)
  const recentUsers = users?.slice(0, 4) || [];

  // Calculate statistics
  const totalPosts = posts?.length || 0;
  const totalUsers = users?.length || 0;
  const totalBookmarks = bookmarkedPosts.length + bookmarkedUsers.length;
  const avgPostsPerUser = totalUsers > 0 ? (totalPosts / totalUsers).toFixed(1) : '0';

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-0">Dashboard</h1>
          <p className="text-muted mb-0">Overview of your portfolio application</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/posts/new" className="btn btn-primary">
            <Icon name="FiEdit" className="me-1" />
            Create Post
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <StatsCard
            title="Total Posts"
            value={totalPosts}
            icon="FiFileText"
            color="primary"
            subtitle="Published content"
          />
        </div>
        <div className="col-md-3 mb-3">
          <StatsCard
            title="Total Users"
            value={totalUsers}
            icon="FiUser"
            color="success"
            subtitle="Community members"
          />
        </div>
        <div className="col-md-3 mb-3">
          <StatsCard
            title="Bookmarks"
            value={totalBookmarks}
            icon="FiBookmark"
            color="warning"
            subtitle="Saved items"
          />
        </div>
        <div className="col-md-3 mb-3">
          <StatsCard
            title="Avg Posts/User"
            value={avgPostsPerUser}
            icon="FiTrendingUp"
            color="info"
            subtitle="Engagement metric"
          />
        </div>
      </div>

      <div className="row">
        {/* Recent Posts */}
        <div className="col-lg-8 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <Icon name="FiFileText" className="me-2" />
                Recent Posts
              </h5>
              <Link to="/posts" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {postsLoading ? (
                <div className="row">
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <PostCardSkeleton />
                    </div>
                  ))}
                </div>
              ) : recentPosts.length > 0 ? (
                <div className="row">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="col-md-6 mb-3">
                      <div className="card h-100 card-hover">
                        <div className="card-body">
                          <h6 className="card-title">
                            <Link 
                              to={`/posts/${post.id}`}
                              className="text-decoration-none"
                            >
                              {truncateText(post.title, 60)}
                            </Link>
                          </h6>
                          <p className="card-text text-muted small">
                            {truncateText(post.body, 100)}
                          </p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">Post #{post.id}</small>
                            <Link 
                              to={`/posts/${post.id}`}
                              className="btn btn-sm btn-outline-primary"
                            >
                              Read More
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No posts available</p>
                  <Link to="/posts/new" className="btn btn-primary">
                    Create First Post
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <Icon name="FiUser" className="me-2" />
                Recent Users
              </h5>
              <Link to="/users" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {usersLoading ? (
                <div>
                  {Array.from({ length: 4 }, (_, index) => (
                    <UserCardSkeleton key={index} />
                  ))}
                </div>
              ) : recentUsers.length > 0 ? (
                <div>
                  {recentUsers.map((user) => (
                    <div key={user.id} className="d-flex align-items-center mb-3">
                      <img
                        src={getAvatarUrl(user.email, 40)}
                        alt={user.name}
                        className="rounded-circle me-3"
                        width="40"
                        height="40"
                        loading="lazy"
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">
                          <Link 
                            to={`/users/${user.id}`}
                            className="text-decoration-none"
                          >
                            {user.name}
                          </Link>
                        </h6>
                        <small className="text-muted">@{user.username}</small>
                      </div>
                      <Link 
                        to={`/users/${user.id}`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No users available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <Icon name="FiGlobe" className="me-2" />
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-3">
                  <Link to="/posts/new" className="btn btn-primary w-100">
                    <Icon name="FiEdit" className="me-2" />
                    Create Post
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/posts" className="btn btn-outline-primary w-100">
                    <Icon name="FiFileText" className="me-2" />
                    Browse Posts
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/users" className="btn btn-outline-primary w-100">
                    <Icon name="FiUser" className="me-2" />
                    View Users
                  </Link>
                </div>
                <div className="col-md-3">
                  <Link to="/bookmarks" className="btn btn-outline-primary w-100">
                    <Icon name="FiBookmark" className="me-2" />
                    My Bookmarks
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 