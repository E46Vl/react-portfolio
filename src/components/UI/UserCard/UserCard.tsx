import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { User } from '../../../types/api';
import { getAvatarUrl } from '../../../utils/helpers';
import './UserCard.scss';

interface UserCardProps {
  user: User;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  isBookmarked, 
  onBookmarkToggle 
}) => {
  return (
    <div className="user-card card h-100 card-hover">
      <div className="card-body text-center d-flex flex-column">
        {/* Avatar */}
        <div className="user-card__avatar-container position-relative mb-3">
          <img
            src={getAvatarUrl(user.email, 80)}
            alt={user.name}
            className="user-card__avatar rounded-circle"
            width="80"
            height="80"
            loading="lazy"
          />
          <button
            className={`user-card__bookmark bookmark-btn position-absolute top-0 end-0 ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={onBookmarkToggle}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Icon name="FiBookmark" />
          </button>
        </div>

        {/* User Info */}
        <h5 className="user-card__name card-title mb-1">
          <Link 
            to={`/users/${user.id}`}
            className="text-decoration-none"
          >
            {user.name}
          </Link>
        </h5>
        
        <p className="user-card__username text-muted mb-2">@{user.username}</p>

        {/* Contact Info */}
        <div className="user-card__contact mb-3 flex-grow-1">
          <div className="user-card__contact-item d-flex align-items-center justify-content-center mb-2">
            <Icon name="FiMail" className="me-2 text-muted" size={14} />
            <small className="text-muted text-truncate">{user.email}</small>
          </div>
          
          <div className="user-card__contact-item d-flex align-items-center justify-content-center mb-2">
            <Icon name="FiMapPin" className="me-2 text-muted" size={14} />
            <small className="text-muted">{user.address.city}</small>
          </div>
          
          <div className="user-card__contact-item d-flex align-items-center justify-content-center mb-2">
            <Icon name="FiGlobe" className="me-2 text-muted" size={14} />
            <small className="text-muted text-truncate">{user.company.name}</small>
          </div>
        </div>

        {/* Actions */}
        <div className="user-card__actions mt-auto">
          <Link 
            to={`/users/${user.id}`}
            className="btn btn-primary btn-sm w-100"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 