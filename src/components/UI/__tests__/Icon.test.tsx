import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from '../Icon';

describe('Icon Component', () => {
  it('renders an icon with correct props', () => {
    render(<Icon name="FiSearch" size={24} className="test-class" />);
    
    const iconElement = screen.getByRole('img', { hidden: true });
    expect(iconElement).toBeInTheDocument();
  });

  it('renders different icon types', () => {
    const { rerender } = render(<Icon name="FiUser" />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<Icon name="FiBookmark" />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();

    rerender(<Icon name="FiMoon" />);
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Icon name="FiSearch" className="custom-class" />);
    
    const iconElement = screen.getByRole('img', { hidden: true });
    expect(iconElement).toHaveClass('custom-class');
  });

  it('applies custom size', () => {
    render(<Icon name="FiSearch" size={32} />);
    
    const iconElement = screen.getByRole('img', { hidden: true });
    expect(iconElement).toHaveStyle({ width: '32px', height: '32px' });
  });
}); 