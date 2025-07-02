import React from 'react';
import Icon from './Icon';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: 'FiBookmark' | 'FiUser' | 'FiFileText' | 'FiGlobe' | 'FiTrendingUp' | 'FiTrendingDown';
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color = 'primary',
  trend,
  subtitle,
  className = '',
}) => {
  const colorClasses = {
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
    info: 'text-info',
  };

  const bgColorClasses = {
    primary: 'bg-primary bg-opacity-10',
    success: 'bg-success bg-opacity-10',
    warning: 'bg-warning bg-opacity-10',
    danger: 'bg-danger bg-opacity-10',
    info: 'bg-info bg-opacity-10',
  };

  return (
    <div className={`card h-100 ${className}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <h6 className="card-title text-muted mb-2">{title}</h6>
            <h3 className="mb-1">{value}</h3>
            {subtitle && (
              <p className="text-muted small mb-0">{subtitle}</p>
            )}
            {trend && (
              <div className="d-flex align-items-center mt-2">
                <Icon
                  name={trend.isPositive ? 'FiTrendingUp' : 'FiTrendingDown'}
                  className={`me-1 ${trend.isPositive ? 'text-success' : 'text-danger'}`}
                  size={14}
                />
                <small className={trend.isPositive ? 'text-success' : 'text-danger'}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </small>
              </div>
            )}
          </div>
          <div className={`rounded-circle p-3 ${bgColorClasses[color]}`}>
            <Icon name={icon} className={colorClasses[color]} size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard; 