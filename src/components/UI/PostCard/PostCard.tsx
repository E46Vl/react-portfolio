import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { Post, User } from '../../../types/api';
import { getAvatarUrl, truncateText } from '../../../utils/helpers';
import './PostCard.scss';

interface PostCardProps {
  post: Post;
  author?: User;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  author, 
  isBookmarked, 
  onBookmarkToggle 
}) => {
  return (
    <div className="post-card card h-100 card-hover">
      <div className="card-body d-flex flex-column">
        {/* Author Info */}
        {author && (
          <div className="post-card__author d-flex align-items-center mb-3">
            <img
              src={getAvatarUrl(author.email)}
              alt={author.name}
              className="post-card__avatar rounded-circle me-2"
              width="32"
              height="32"
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
              className={`post-card__bookmark bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={onBookmarkToggle}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <Icon name="FiBookmark" />
            </button>
          </div>
        )}

        {/* Post Content */}
        <h5 className="post-card__title card-title">
          <Link 
            to={`/posts/${post.id}`}
            className="text-decoration-none"
          >
            {truncateText(post.title, 80)}
          </Link>
        </h5>
        
        <p className="post-card__body card-text text-muted flex-grow-1">
          {truncateText(post.body, 120)}
        </p>

        {/* Actions */}
        <div className="post-card__actions d-flex justify-content-between align-items-center mt-auto">
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
  );
};

export default PostCard; 