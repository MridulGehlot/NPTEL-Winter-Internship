import React from 'react';
import type { PortfolioSummaryProps } from '../types/asset';

const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ assets }) => {
  const totalValue: number = assets.reduce((sum, asset) => sum + asset.value, 0);
  const averageChange: number = assets.length > 0 
    ? assets.reduce((sum, asset) => sum + asset.change, 0) / assets.length 
    : 0;

  return (
    <div className="portfolio-summary" style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      margin: '10px 0'
    }}>
      <h3>Portfolio Summary</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div><strong>Total:</strong> ${totalValue.toFixed(2)}</div>
        <div><strong>Avg Change:</strong> {averageChange > 0 ? '+' : ''}{averageChange.toFixed(2)}%</div>
        <div><strong>Assets:</strong> {assets.length}</div>
      </div>
    </div>
  );
};

export default PortfolioSummary;