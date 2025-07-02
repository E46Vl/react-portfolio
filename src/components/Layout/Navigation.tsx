import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../UI/Icon';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { toggleSidebar } from '../../store/slices/uiSlice';

interface NavigationProps {
  onSearch?: (query: string) => void;
  searchQuery?: string;
}

const Navigation: React.FC<NavigationProps> = ({ onSearch, searchQuery = '' }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mode = useAppSelector((state: any) => state.theme.mode);
  const sidebarOpen = useAppSelector((state: any) => state.ui.sidebarOpen);
  const bookmarkedPosts = useAppSelector((state: any) => state.bookmarks.bookmarkedPosts);
  const bookmarkedUsers = useAppSelector((state: any) => state.bookmarks.bookmarkedUsers);

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showSearch, setShowSearch] = useState(false);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleSidebarToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(localSearch);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    onSearch?.(e.target.value);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const totalBookmarks = bookmarkedPosts.length + bookmarkedUsers.length;

  return (
    <nav className={`navbar navbar-expand-lg ${mode === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} sticky-top shadow-sm`}>
      <div className="container-fluid">
        {/* Brand */}
        <Link className={`navbar-brand fw-bold ${mode === 'dark' ? 'text-light' : 'text-primary'}`} to="/">
          <span className="fs-4">📚 Portfolio</span>
        </Link>

        {/* Mobile menu toggle */}
        <div className="d-lg-none d-flex align-items-center gap-2">
          {/* Search toggle for mobile */}
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
          >
            <Icon name="FiSearch" />
          </button>

          {/* Theme toggle */}
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
          >
            {mode === 'light' ? <Icon name="FiMoon" /> : <Icon name="FiSun" />}
          </button>

          {/* Sidebar toggle */}
          <button
            className="btn btn-outline-secondary btn-sm"
            type="button"
            onClick={handleSidebarToggle}
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <Icon name="FiX" /> : <Icon name="FiMenu" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Navigation Links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActiveRoute('/dashboard') ? 'active fw-semibold' : ''}`}
                to="/dashboard"
              >
                <Icon name="FiGlobe" className="me-1" />
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActiveRoute('/posts') ? 'active fw-semibold' : ''}`}
                to="/posts"
              >
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActiveRoute('/users') ? 'active fw-semibold' : ''}`}
                to="/users"
              >
                Users
              </Link>
            </li>
            {totalBookmarks > 0 && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActiveRoute('/bookmarks') ? 'active fw-semibold' : ''}`}
                  to="/bookmarks"
                >
                  <Icon name="FiBookmark" className="me-1" />
                  Bookmarks
                  <span className="badge bg-primary ms-1">{totalBookmarks}</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Search Form - Desktop */}
          {onSearch && (
            <form className="d-flex me-3" onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search posts..."
                  value={localSearch}
                  onChange={handleSearchChange}
                  style={{ minWidth: '200px' }}
                />
                <button className="btn btn-outline-secondary" type="submit">
                  <Icon name="FiSearch" />
                </button>
              </div>
            </form>
          )}

          {/* Theme Toggle - Desktop */}
          <button
            className="btn btn-outline-secondary me-2"
            type="button"
            onClick={handleThemeToggle}
            aria-label="Toggle theme"
            title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? <Icon name="FiMoon" /> : <Icon name="FiSun" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className="container-fluid border-top pt-3 pb-2 d-lg-none">
          <form onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search posts..."
                value={localSearch}
                onChange={handleSearchChange}
                autoFocus
              />
              <button className="btn btn-primary" type="submit">
                <Icon name="FiSearch" />
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 