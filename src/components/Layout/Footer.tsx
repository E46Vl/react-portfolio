import React from 'react';
import Icon from '../UI/Icon';
import { useAppSelector } from '../../hooks/redux';

const Footer: React.FC = () => {
  const mode = useAppSelector((state: any) => state.theme.mode);
  return (
    <footer className={`${mode === 'dark' ? 'bg-dark text-light' : 'bg-light text-muted'} border-top mt-auto`}>
      <div className="container-fluid py-4">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">
              © 2024 Portfolio Hub. Built with React, TypeScript & Bootstrap.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end justify-content-center gap-3 mt-2 mt-md-0">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className={mode === 'dark' ? 'text-light' : 'text-muted'}
                aria-label="GitHub"
              >
                <Icon name="FiGithub" size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className={mode === 'dark' ? 'text-light' : 'text-muted'}
                aria-label="LinkedIn"
              >
                <Icon name="FiLinkedin" size={20} />
              </a>
              <a
                href="mailto:contact@example.com"
                className={mode === 'dark' ? 'text-light' : 'text-muted'}
                aria-label="Email"
              >
                <Icon name="FiMail" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 