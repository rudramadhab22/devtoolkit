import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('renders heading and search bar', () => {
    render(<HomePage />);
    expect(screen.getByText(/Developer Tools/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search for tools/i)).toBeInTheDocument();
  });

  it('filters tools based on search query', () => {
    render(<HomePage />);
    const searchInput = screen.getByPlaceholderText(/Search for tools/i);

    fireEvent.change(searchInput, { target: { value: 'JSON' } });

    expect(screen.getByText('JSON Formatter & Validator')).toBeInTheDocument();
    expect(screen.queryByText('UUID Generator')).not.toBeInTheDocument();
  });

  it('filters tools based on category', () => {
    render(<HomePage />);
    const securityTab = screen.getByRole('button', { name: 'Security' });

    fireEvent.click(securityTab);

    expect(screen.getByText('JWT Decoder')).toBeInTheDocument();
    expect(screen.queryByText('JSON Formatter & Validator')).not.toBeInTheDocument();
  });
});