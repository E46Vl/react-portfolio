import React, { Component, ErrorInfo, ReactNode } from 'react';
import Icon from './Icon';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card border-danger">
                <div className="card-body text-center">
                  <div className="text-danger mb-4">
                    <Icon name="FiAlertTriangle" size={64} />
                  </div>
                  
                  <h3 className="card-title text-danger mb-3">Something went wrong</h3>
                  
                  <p className="card-text text-muted mb-4">
                    We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
                  </p>
                  
                  {process.env.NODE_ENV === 'development' && this.state.error && (
                    <div className="alert alert-secondary text-start mb-4">
                      <h6>Error Details (Development Only):</h6>
                      <pre className="mb-0 small">
                        <code>{this.state.error.toString()}</code>
                      </pre>
                      {this.state.errorInfo && (
                        <details className="mt-2">
                          <summary>Component Stack</summary>
                          <pre className="mt-2 small">
                            <code>{this.state.errorInfo.componentStack}</code>
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                  
                  <div className="d-flex gap-2 justify-content-center">
                    <button
                      className="btn btn-primary"
                      onClick={this.handleReset}
                    >
                      Try Again
                    </button>
                    
                    <button
                      className="btn btn-outline-primary"
                      onClick={this.handleReload}
                    >
                      <Icon name="FiRefreshCw" className="me-1" />
                      Reload Page
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional error component for specific error states
export const ErrorMessage: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}> = ({
  title = 'Error',
  message = 'Something went wrong. Please try again.',
  onRetry,
  showRetry = true,
}) => {
  return (
    <div className="text-center py-5">
      <div className="text-danger mb-3">
        <Icon name="FiAlertTriangle" size={48} />
      </div>
      <h4 className="text-danger mb-2">{title}</h4>
      <p className="text-muted mb-3">{message}</p>
      {showRetry && onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          <Icon name="FiRefreshCw" className="me-1" />
          Try Again
        </button>
      )}
    </div>
  );
};

// 404 Not Found component
export const NotFound: React.FC<{ 
  title?: string; 
  message?: string;
  showHomeButton?: boolean;
}> = ({
  title = 'Page Not Found',
  message = 'The page you are looking for does not exist.',
  showHomeButton = true,
}) => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className="display-1 text-muted mb-4">404</div>
          <h2 className="mb-3">{title}</h2>
          <p className="text-muted mb-4">{message}</p>
          {showHomeButton && (
            <a href="/" className="btn btn-primary">
              Go Home
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Empty state component
export const EmptyState: React.FC<{
  title?: string;
  message?: string;
  icon?: ReactNode;
  action?: ReactNode;
}> = ({
  title = 'No data found',
  message = 'There is nothing here yet.',
  icon,
  action,
}) => {
  return (
    <div className="text-center py-5">
      {icon && <div className="text-muted mb-3">{icon}</div>}
      <h4 className="text-muted mb-2">{title}</h4>
      <p className="text-muted mb-3">{message}</p>
      {action && action}
    </div>
  );
};

export default ErrorBoundary; 