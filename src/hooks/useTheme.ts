import { useAppDispatch, useAppSelector } from './redux';
import { toggleTheme, setTheme } from '../store/slices/themeSlice';

export const useTheme = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state: any) => state.theme.mode);

  const toggle = () => {
    dispatch(toggleTheme());
  };

  const set = (theme: 'light' | 'dark') => {
    dispatch(setTheme(theme));
  };

  const isDark = mode === 'dark';
  const isLight = mode === 'light';

  return {
    mode,
    isDark,
    isLight,
    toggle,
    set,
  };
}; 