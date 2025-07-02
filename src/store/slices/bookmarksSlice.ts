import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookmarkState {
  bookmarkedPosts: number[];
  bookmarkedUsers: number[];
}

// Get initial bookmarks from localStorage
const getInitialBookmarks = (): BookmarkState => {
  if (typeof window !== 'undefined') {
    const savedPosts = localStorage.getItem('bookmarkedPosts');
    const savedUsers = localStorage.getItem('bookmarkedUsers');
    
    return {
      bookmarkedPosts: savedPosts ? JSON.parse(savedPosts) : [],
      bookmarkedUsers: savedUsers ? JSON.parse(savedUsers) : [],
    };
  }
  
  return {
    bookmarkedPosts: [],
    bookmarkedUsers: [],
  };
};

const initialState: BookmarkState = getInitialBookmarks();

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    togglePostBookmark: (state, action: PayloadAction<number>) => {
      const postId = action.payload;
      const isBookmarked = state.bookmarkedPosts.includes(postId);
      
      if (isBookmarked) {
        state.bookmarkedPosts = state.bookmarkedPosts.filter(id => id !== postId);
      } else {
        state.bookmarkedPosts.push(postId);
      }
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookmarkedPosts', JSON.stringify(state.bookmarkedPosts));
      }
    },
    toggleUserBookmark: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      const isBookmarked = state.bookmarkedUsers.includes(userId);
      
      if (isBookmarked) {
        state.bookmarkedUsers = state.bookmarkedUsers.filter(id => id !== userId);
      } else {
        state.bookmarkedUsers.push(userId);
      }
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookmarkedUsers', JSON.stringify(state.bookmarkedUsers));
      }
    },
    clearAllBookmarks: (state) => {
      state.bookmarkedPosts = [];
      state.bookmarkedUsers = [];
      
      // Clear from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bookmarkedPosts');
        localStorage.removeItem('bookmarkedUsers');
      }
    },
  },
});

export const { togglePostBookmark, toggleUserBookmark, clearAllBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer; 