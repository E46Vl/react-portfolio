import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../components/UI/Icon';
import { usePost, useUpdatePost } from '../features/posts/services/postsApi';
import { useUsers } from '../features/users/services/usersApi';
import { UpdatePostRequest } from '../types/api';
import { PostDetailSkeleton } from '../components/UI/SkeletonLoader';
import { ErrorMessage } from '../components/UI/ErrorBoundary';

// Validation schema
const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title must not exceed 100 characters'),
  body: yup
    .string()
    .required('Content is required')
    .min(20, 'Content must be at least 20 characters')
    .max(1000, 'Content must not exceed 1000 characters'),
  userId: yup
    .number()
    .required('Please select an author')
    .positive('Please select a valid author'),
}).required();

const EditPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = parseInt(id!);
  
  const updatePostMutation = useUpdatePost();
  const { data: post, isLoading: postLoading, isError: postError } = usePost(postId);
  const { data: users, isLoading: usersLoading } = useUsers();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<Omit<UpdatePostRequest, 'id'>>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      body: '',
      userId: 1,
    },
  });

  // Pre-populate form when post data is loaded
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
        userId: post.userId,
      });
    }
  }, [post, reset]);

  const watchedTitle = watch('title');
  const watchedBody = watch('body');
  const titleLength = watchedTitle?.length || 0;
  const bodyLength = watchedBody?.length || 0;

  const onSubmit = async (data: Omit<UpdatePostRequest, 'id'>) => {
    try {
      await updatePostMutation.mutateAsync({ ...data, id: postId });
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error('Update post error:', error);
    }
  };

  const handleCancel = () => {
    navigate(`/posts/${postId}`);
  };

  if (postLoading) {
    return (
      <div className="container mt-4">
        <PostDetailSkeleton />
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="Failed to load post"
          message="Unable to fetch post details for editing."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h2 mb-0">Edit Post</h1>
          <p className="text-muted mb-0">Update your post content</p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleCancel}
        >
          <Icon name="FiX" className="me-1" />
          Cancel
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Author Selection */}
                <div className="mb-4">
                  <label htmlFor="userId" className="form-label">
                    <Icon name="FiUser" className="me-1" />
                    Author
                  </label>
                  <Controller
                    name="userId"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`form-select ${errors.userId ? 'is-invalid' : ''}`}
                        disabled={usersLoading}
                      >
                        <option value="">Select an author...</option>
                        {users?.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} (@{user.username})
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.userId && (
                    <div className="invalid-feedback d-block">
                      {errors.userId.message}
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    <Icon name="FiEdit" className="me-1" />
                    Title
                  </label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        placeholder="Enter your post title..."
                        maxLength={100}
                      />
                    )}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    {errors.title && (
                      <div className="invalid-feedback d-block">
                        {errors.title.message}
                      </div>
                    )}
                    <small className="text-muted ms-auto">
                      {titleLength}/100
                    </small>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <label htmlFor="body" className="form-label">
                    <Icon name="FiFileText" className="me-1" />
                    Content
                  </label>
                  <Controller
                    name="body"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                        rows={8}
                        placeholder="Write your post content here..."
                        maxLength={1000}
                        style={{ resize: 'vertical' }}
                      />
                    )}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    {errors.body && (
                      <div className="invalid-feedback d-block">
                        {errors.body.message}
                      </div>
                    )}
                    <small className="text-muted ms-auto">
                      {bodyLength}/1000
                    </small>
                  </div>
                </div>

                {/* Preview Section */}
                {(watchedTitle || watchedBody) && (
                  <div className="mb-4">
                    <h6 className="mb-3">
                      <Icon name="FiEye" className="me-1" />
                      Preview
                    </h6>
                    <div className="card bg-light">
                      <div className="card-body">
                        {watchedTitle && (
                          <h5 className="card-title mb-3">{watchedTitle}</h5>
                        )}
                        {watchedBody && (
                          <p className="card-text" style={{ whiteSpace: 'pre-wrap' }}>
                            {watchedBody}
                          </p>
                        )}
                        {!watchedTitle && !watchedBody && (
                          <p className="text-muted mb-0">Start typing to see a preview...</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form Actions */}
                <div className="d-flex gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting || updatePostMutation.isPending}
                  >
                    {isSubmitting || updatePostMutation.isPending ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true">
                          <span className="visually-hidden">Loading...</span>
                        </span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Icon name="FiSave" className="me-1" />
                        Update Post
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Post Info */}
          <div className="card mt-4">
            <div className="card-header">
              <h6 className="mb-0">
                <Icon name="FiInfo" className="me-1" />
                Post Information
              </h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <small className="text-muted">Post ID</small>
                  <p className="mb-2">#{post.id}</p>
                </div>
                <div className="col-md-6">
                  <small className="text-muted">Created</small>
                  <p className="mb-2">Recently</p>
                </div>
              </div>
              <div className="alert alert-info mb-0">
                <Icon name="FiAlertCircle" className="me-2" />
                <small>
                  Changes will be reflected immediately. Note that this is a demo using JSONPlaceholder API, 
                  so changes won't persist on the server.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost; 