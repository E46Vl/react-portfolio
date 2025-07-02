import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './slices/themeSlice';
import bookmarksSlice from './slices/bookmarksSlice';
import uiSlice from './slices/uiSlice';

// Configure store with slices
export const store = configureStore({
  reducer: {
    theme: themeSlice,
    bookmarks: bookmarksSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 