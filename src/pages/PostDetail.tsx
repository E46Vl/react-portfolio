import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Icon from '../components/UI/Icon';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { togglePostBookmark } from '../store/slices/bookmarksSlice';
import { usePost, usePostComments, useDeletePost } from '../features/posts/services/postsApi';
import { useUser } from '../features/users/services/usersApi';
import { PostDetailSkeleton } from '../components/UI/SkeletonLoader';
import { ErrorMessage } from '../components/UI/ErrorBoundary';
import CommentCard from '../components/UI/CommentCard';
import { formatDate, getAvatarUrl } from '../utils/helpers';
import { Comment } from '../types/api';
import './PostDetail.scss';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookmarkedPosts = useAppSelector((state: any) => state.bookmarks.bookmarkedPosts);
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const postId = parseInt(id!);

  // Fetch post data
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
  } = usePost(postId);

  // Fetch post comments
  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = usePostComments(postId);

  // Fetch author data
  const {
    data: author,
  } = useUser(post?.userId || 0);

  // Delete post mutation
  const deleteMutation = useDeletePost();

  const isBookmarked = bookmarkedPosts.includes(postId);

  const handleBookmarkToggle = () => {
    dispatch(togglePostBookmark(postId));
    toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleDelete = () => {
    deleteMutation.mutate(postId, {
      onSuccess: () => {
        navigate('/posts');
      }
    });
    setShowDeleteConfirm(false);
  };

  if (postLoading) {
    return (
      <div className="container mt-4">
        <PostDetailSkeleton />
      </div>
    );
  }

  if (postError) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="Failed to load post"
          message="Unable to fetch post details. Please check your connection and try again."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="Post not found"
          message="The post you're looking for doesn't exist or has been removed."
          onRetry={() => navigate('/posts')}
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
            <Link to="/posts" className="text-decoration-none">Posts</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Post #{post.id}
          </li>
        </ol>
      </nav>

      {/* Post Content */}
      <div className="row">
        <div className="col-lg-8">
          {/* Post Card */}
          <div className="post-detail__card card mb-4">
            <div className="card-body">
              {/* Author Info */}
              {author && (
                <div className="post-detail__author d-flex align-items-center mb-3">
                  <img
                    src={getAvatarUrl(author.email)}
                    alt={author.name}
                    className="post-detail__avatar rounded-circle me-3"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <div className="me-auto">
                    <h6 className="mb-0">
                      <Link 
                        to={`/users/${author.id}`} 
                        className="text-decoration-none"
                      >
                        {author.name}
                      </Link>
                    </h6>
                    <small className="text-muted">@{author.username}</small>
                  </div>
                  <button
                    className={`post-detail__bookmark btn btn-sm rounded-circle ${
                      isBookmarked ? 'btn-warning' : 'btn-outline-secondary'
                    }`}
                    onClick={handleBookmarkToggle}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    <Icon name="FiBookmark" />
                  </button>
                </div>
              )}

              {/* Post Title */}
              <h1 className="post-detail__title card-title mb-3">{post.title}</h1>
              
              {/* Post Body */}
              <p className="post-detail__body card-text fs-5">{post.body}</p>

              {/* Post Meta */}
              <div className="post-detail__meta d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                <small className="text-muted">
                  <Icon name="FiUser" className="me-1" />
                  Post #{post.id} • {formatDate(new Date())}
                </small>
                
                <div className="btn-group">
                  <Link 
                    to={`/posts/${post.id}/edit`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Edit Post
                  </Link>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="post-detail__comments card">
            <div className="card-header">
              <h5 className="mb-0">
                Comments ({comments?.length || 0})
              </h5>
            </div>
            <div className="card-body">
              {commentsLoading ? (
                <div>
                  {Array.from({ length: 3 }, (_, index) => (
                    <div key={index} className="border-bottom pb-3 mb-3">
                      <div className="d-flex align-items-start">
                        <div className="skeleton-loader__item skeleton-loader__comment-avatar me-3"></div>
                        <div className="flex-grow-1">
                          <div className="skeleton-loader__item skeleton-loader__comment-name mb-1"></div>
                          <div className="skeleton-loader__item skeleton-loader__comment-email mb-2"></div>
                          <div className="skeleton-loader__item skeleton-loader__comment-body"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : commentsError ? (
                <div className="text-center text-muted">
                  <Icon name="FiAlertCircle" size={48} className="mb-3" />
                  <p>Failed to load comments</p>
                </div>
              ) : comments && comments.length > 0 ? (
                <div>
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted">
                  <p>No comments yet. Be the first to comment!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-lg-4">
          {/* Author Info Card */}
          {author && (
            <div className="post-detail__sidebar card">
              <div className="card-header">
                <h6 className="mb-0">About the Author</h6>
              </div>
              <div className="card-body text-center">
                <img
                  src={getAvatarUrl(author.email, 80)}
                  alt={author.name}
                  className="rounded-circle mb-3"
                  width="80"
                  height="80"
                  loading="lazy"
                />
                <h6 className="mb-1">
                  <Link 
                    to={`/users/${author.id}`} 
                    className="text-decoration-none"
                  >
                    {author.name}
                  </Link>
                </h6>
                <p className="text-muted mb-3">@{author.username}</p>
                
                <div className="text-start">
                  <div className="d-flex align-items-center mb-2">
                    <Icon name="FiMail" className="me-2 text-muted" size={14} />
                    <small className="text-muted">{author.email}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Icon name="FiMapPin" className="me-2 text-muted" size={14} />
                    <small className="text-muted">{author.address.city}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Icon name="FiGlobe" className="me-2 text-muted" size={14} />
                    <small className="text-muted">{author.company.name}</small>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="post-detail__modal modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteConfirm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this post? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail; 