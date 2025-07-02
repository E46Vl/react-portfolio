import { useAppDispatch, useAppSelector } from './redux';
import { togglePostBookmark, toggleUserBookmark } from '../store/slices/bookmarksSlice';
import { toast } from 'react-hot-toast';

export const useBookmarks = () => {
  const dispatch = useAppDispatch();
  const bookmarkedPosts = useAppSelector((state: any) => state.bookmarks.bookmarkedPosts);
  const bookmarkedUsers = useAppSelector((state: any) => state.bookmarks.bookmarkedUsers);

  const togglePost = (postId: number, showToast: boolean = true) => {
    dispatch(togglePostBookmark(postId));
    if (showToast) {
      const isBookmarked = bookmarkedPosts.includes(postId);
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    }
  };

  const toggleUser = (userId: number, showToast: boolean = true) => {
    dispatch(toggleUserBookmark(userId));
    if (showToast) {
      const isBookmarked = bookmarkedUsers.includes(userId);
      toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    }
  };

  const isPostBookmarked = (postId: number): boolean => {
    return bookmarkedPosts.includes(postId);
  };

  const isUserBookmarked = (userId: number): boolean => {
    return bookmarkedUsers.includes(userId);
  };

  const totalBookmarks = bookmarkedPosts.length + bookmarkedUsers.length;

  return {
    bookmarkedPosts,
    bookmarkedUsers,
    togglePost,
    toggleUser,
    isPostBookmarked,
    isUserBookmarked,
    totalBookmarks,
  };
}; 