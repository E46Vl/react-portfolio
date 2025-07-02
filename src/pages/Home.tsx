import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/UI/Icon';

const Home: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 text-center">
          <h1 className="display-4 mb-4">Developed by Volodya Galstyan</h1>
          <p className="lead mb-4">
            A modern React application showcasing posts and users with advanced features like 
            infinite scroll, search, bookmarking, and dark mode.
          </p>
          
          {/* Feature Cards */}
          <div className="row g-4 mt-4">
            <div className="col-md-6">
              <div className="card h-100 card-hover">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <Icon name="FiBookmark" size={32} />
                  </div>
                  <h5 className="card-title">📝 Posts</h5>
                  <p className="card-text">
                    Explore posts with infinite scroll, search functionality, and bookmark your favorites.
                  </p>
                  <Link to="/posts" className="btn btn-primary">
                    Browse Posts
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100 card-hover">
                <div className="card-body">
                  <div className="text-primary mb-3">
                    <Icon name="FiUser" size={32} />
                  </div>
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">
                    Connect with amazing people in our community and view their profiles.
                  </p>
                  <Link to="/users" className="btn btn-primary">
                    Meet Users
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-5 mb-5">
            <h3 className="mb-4">Features</h3>
            <div className="row g-3">
              <div className="col-sm-6 col-lg-3">
                <div className="feature-item p-3 rounded border">
                  <div className="text-primary mb-2">
                    <Icon name="FiSearch" size={24} />
                  </div>
                  <h6>Advanced Search</h6>
                  <small className="text-muted">Search posts and users with real-time filtering</small>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="feature-item p-3 rounded border">
                  <div className="text-primary mb-2">
                    <Icon name="FiBookmark" size={24} />
                  </div>
                  <h6>Bookmarking</h6>
                  <small className="text-muted">Save your favorite posts and users</small>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="feature-item p-3 rounded border">
                  <div className="text-primary mb-2">
                    <Icon name="FiMoon" size={24} />
                  </div>
                  <h6>Dark Mode</h6>
                  <small className="text-muted">Switch between light and dark themes</small>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="feature-item p-3 rounded border">
                  <div className="text-primary mb-2">
                    <Icon name="FiGlobe" size={24} />
                  </div>
                  <h6>Responsive</h6>
                  <small className="text-muted">Works perfectly on all devices</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 