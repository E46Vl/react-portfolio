import React from 'react';
import { render, screen } from '@testing-library/react';
import StatsCard from '../StatsCard';

describe('StatsCard Component', () => {
  const defaultProps = {
    title: 'Test Title',
    value: '100',
    icon: 'FiUser' as const,
  };

  it('renders with basic props', () => {
    render(<StatsCard {...defaultProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders with subtitle', () => {
    render(<StatsCard {...defaultProps} subtitle="Test subtitle" />);
    
    expect(screen.getByText('Test subtitle')).toBeInTheDocument();
  });

  it('renders with trend information', () => {
    render(
      <StatsCard 
        {...defaultProps} 
        trend={{ value: 15, isPositive: true }}
      />
    );
    
    expect(screen.getByText('+15%')).toBeInTheDocument();
  });

  it('renders with different colors', () => {
    const { rerender } = render(<StatsCard {...defaultProps} color="success" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<StatsCard {...defaultProps} color="warning" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    rerender(<StatsCard {...defaultProps} color="danger" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<StatsCard {...defaultProps} className="custom-class" />);
    
    const cardElement = screen.getByText('Test Title').closest('.card');
    expect(cardElement).toHaveClass('custom-class');
  });
}); 