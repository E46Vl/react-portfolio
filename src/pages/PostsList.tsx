import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/UI/Icon';
import { usePostsInfinite } from '../features/posts/services/postsApi';
import { useUsers } from '../features/users/services/usersApi';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { togglePostBookmark } from '../store/slices/bookmarksSlice';
import { PostCardSkeleton, ListSkeleton } from '../components/UI/SkeletonLoader';
import { ErrorMessage, EmptyState } from '../components/UI/ErrorBoundary';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import PostCard from '../components/UI/PostCard';
import { truncateText, getAvatarUrl } from '../utils/helpers';
import { Post, User } from '../types/api';

const PostsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const bookmarkedPosts = useAppSelector((state: any) => state.bookmarks.bookmarkedPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const loadMoreRef = useRef<HTMLDivElement>(null);

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

  // Fetch posts with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = usePostsInfinite(debouncedSearch);

  // Fetch users for author information
  const { data: users } = useUsers();

  // Create a map of users for quick lookup
  const usersMap = React.useMemo(() => {
    if (!users) return new Map();
    return new Map(users.map(user => [user.id, user]));
  }, [users]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreElement);

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleBookmarkToggle = (postId: number) => {
    dispatch(togglePostBookmark(postId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedSearch('');
  };

  // Flatten posts from all pages
  const allPosts = data ? data.pages.flatMap(page => page.posts) : [];

  if (isError) {
    return (
      <div className="container mt-4">
        <ErrorMessage
          title="Failed to load posts"
          message="Unable to fetch posts. Please check your connection and try again."
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
              <h1 className="h2 mb-0">Posts</h1>
              <p className="text-muted mb-0">
                Discover and explore posts from our community
              </p>
            </div>
            <Link to="/posts/new" className="btn btn-primary">
              Create Post
            </Link>
          </div>

          {/* Search Bar */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search posts by title or content..."
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

          {/* Posts Grid */}
          <div className="row">
            {/* Loading Skeleton */}
            {isLoading && (
              <div className="col-12">
                <ListSkeleton count={6} component={PostCardSkeleton} />
              </div>
            )}

            {/* Posts */}
            {!isLoading && allPosts.length > 0 && (
              <>
                {allPosts.map((post) => {
                  const author = usersMap.get(post.userId);
                  const isBookmarked = bookmarkedPosts.includes(post.id);

                  return (
                    <div key={post.id} className="col-md-6 col-lg-4 mb-4">
                      <PostCard
                        post={post}
                        author={author}
                        isBookmarked={isBookmarked}
                        onBookmarkToggle={() => handleBookmarkToggle(post.id)}
                      />
                    </div>
                  );
                })}
              </>
            )}

            {/* Empty State */}
            {!isLoading && allPosts.length === 0 && (
              <div className="col-12">
                <EmptyState
                  title={debouncedSearch ? 'No posts found' : 'No posts available'}
                  message={
                    debouncedSearch
                      ? `No posts match your search for "${debouncedSearch}"`
                      : 'There are no posts to display at the moment.'
                  }
                  action={
                    debouncedSearch ? (
                      <button className="btn btn-primary" onClick={clearSearch}>
                        Clear Search
                      </button>
                    ) : (
                      <Link to="/posts/new" className="btn btn-primary">
                        Create the first post
                      </Link>
                    )
                  }
                />
              </div>
            )}
          </div>

          {/* Load More Trigger */}
          {hasNextPage && (
            <div ref={loadMoreRef} className="text-center py-4">
              {isFetchingNextPage ? (
                <LoadingSpinner text="Loading more posts..." />
              ) : (
                <p className="text-muted">Scroll down to load more posts</p>
              )}
            </div>
          )}

          {/* End of Results */}
          {!hasNextPage && allPosts.length > 0 && (
            <div className="text-center py-4">
              <p className="text-muted">You've reached the end of the posts!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsList; 