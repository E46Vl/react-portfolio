// Redux Store Types

export interface ThemeState {
  mode: 'light' | 'dark';
}

export interface BookmarkState {
  bookmarkedPosts: number[];
  bookmarkedUsers: number[];
}

export interface UIState {
  sidebarOpen: boolean;
  loading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

// Root State Interface
export interface RootState {
  theme: ThemeState;
  bookmarks: BookmarkState;
  ui: UIState;
}

// Action Types
export interface ThemeAction {
  type: 'theme/toggleTheme' | 'theme/setTheme';
  payload?: 'light' | 'dark';
}

export interface BookmarkAction {
  type: 'bookmarks/togglePostBookmark' | 'bookmarks/toggleUserBookmark';
  payload: number;
}

export interface UIAction {
  type: 'ui/toggleSidebar' | 'ui/setLoading' | 'ui/addNotification' | 'ui/removeNotification';
  payload?: boolean | Notification | string;
} 