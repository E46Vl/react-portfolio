import React from 'react';
import { Comment } from '../../../types/api';
import { formatDate } from '../../../utils/helpers';
import './CommentCard.scss';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <div className="comment-card border-bottom pb-3 mb-3">
      <div className="d-flex align-items-start">
        <div className="comment-card__avatar skeleton rounded-circle me-3"></div>
        <div className="flex-grow-1">
          <div className="comment-card__header mb-2">
            <h6 className="comment-card__name mb-1">{comment.name}</h6>
            <small className="comment-card__email text-muted">{comment.email}</small>
          </div>
          <p className="comment-card__body mb-2">{comment.body}</p>
          <small className="comment-card__date text-muted">
            {formatDate(new Date())}
          </small>
        </div>
      </div>
    </div>
  );
};

export default CommentCard; 