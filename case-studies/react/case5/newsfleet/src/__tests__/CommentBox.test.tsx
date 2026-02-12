import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommentBox } from '../components/CommentBox';
import '@testing-library/jest-dom';

describe('CommentBox', () => {
  test('renders input and Post button', () => {
    render(<CommentBox onPost={() => {}} />);
    expect(screen.getByPlaceholderText('Add a comment...')).toBeInTheDocument();
    expect(screen.getByTestId('post-button')).toBeInTheDocument();
  });

  test('calls onPost with input value and clears input', async () => {
    const user = userEvent.setup();
    const mockPost = jest.fn();
    
    render(<CommentBox onPost={mockPost} />);
    
    const input = screen.getByTestId('comment-input');
    await user.type(input, 'Great article!');
    await user.click(screen.getByTestId('post-button'));
    
    expect(mockPost).toHaveBeenCalledWith('Great article!');
    expect(input).toHaveValue(''); // Cleared after post
  });

  test('does not call onPost with empty input', async () => {
    const user = userEvent.setup();
    const mockPost = jest.fn();
    
    render(<CommentBox onPost={mockPost} />);
    await user.click(screen.getByTestId('post-button'));
    
    expect(mockPost).not.toHaveBeenCalled();
  });
});
