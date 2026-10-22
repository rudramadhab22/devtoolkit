import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ToolCard from '../components/ToolCard';
import { Code } from 'lucide-react';

const mockTool = {
  id: 'test-tool',
  name: 'Test Tool',
  description: 'This is a test tool description.',
  icon: Code,
  category: 'Testing',
  tags: ['test', 'mock']
};

describe('ToolCard', () => {
  it('renders tool information correctly', () => {
    render(<ToolCard tool={mockTool} />);

    expect(screen.getByText('Test Tool')).toBeInTheDocument();
    expect(screen.getByText('This is a test tool description.')).toBeInTheDocument();
    expect(screen.getByText('Coming Phase 2')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('mock')).toBeInTheDocument();
  });
});