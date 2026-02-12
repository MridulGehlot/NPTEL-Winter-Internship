import React, { useState } from 'react';

interface CommentBoxProps {
  onPost: (comment: string) => void;
}

export const CommentBox: React.FC<CommentBoxProps> = ({ onPost }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onPost(comment);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="comment-form">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        data-testid="comment-input"
      />
      <button type="submit" data-testid="post-button">Post</button>
    </form>
  );
};
