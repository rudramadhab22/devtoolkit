import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '../components/Header';
import { ThemeProvider } from '../context/ThemeContext';

// Mock matchMedia
window.matchMedia = vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));

describe('Header', () => {
  it('renders brand name', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    expect(screen.getByText('DevToolkit')).toBeInTheDocument();
  });

  it('toggles theme on button click', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    const toggleBtn = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggleBtn);
    expect(document.documentElement).toHaveClass('dark');
  });
});