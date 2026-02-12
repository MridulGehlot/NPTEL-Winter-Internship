import React from 'react';

interface ArticleCardProps {
  title: string;
  author: string;
  onApprove: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  title, 
  author, 
  onApprove 
}) => (
  <article data-testid="article-card">
    <h2>{title}</h2>
    <p>By {author}</p>
    <button onClick={onApprove}>Approve</button>
  </article>
);