import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleCard } from '../components/ArticleCard';

describe('ArticleCard', () => {
  test('renders article title and author', () => {
    render(<ArticleCard title="Breaking News" author="Jane Doe" onApprove={() => {}} />);
    expect(screen.getByText('Breaking News')).toBeInTheDocument();
    expect(screen.getByText('By Jane Doe')).toBeInTheDocument();
  });

  test('calls onApprove when button is clicked', () => {
    const mockApprove = jest.fn();
    render(<ArticleCard title="Test" author="John" onApprove={mockApprove} />);
    fireEvent.click(screen.getByText('Approve'));
    expect(mockApprove).toHaveBeenCalledTimes(1);
  });
});
