import { useReducer } from 'react';
import PortfolioSummary from './components/PortfolioSummary';
import AssetEditor from './components/AssetEditor';
import type { Asset } from './types/asset';
import './App.css';

interface PortfolioDemoState {
  assets: Asset[];
}

type PortfolioDemoAction = 
  | { type: 'update'; asset: Asset };

const portfolioDemoReducer = (state: PortfolioDemoState, action: PortfolioDemoAction): PortfolioDemoState => {
  switch (action.type) {
    case 'update':
      const existsIndex = state.assets.findIndex(a => a.symbol === action.asset.symbol);
      if (existsIndex >= 0) {
        const updatedAssets = [...state.assets];
        updatedAssets[existsIndex] = action.asset;
        return { ...state, assets: updatedAssets };
      }
      return { ...state, assets: [...state.assets, action.asset] };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(portfolioDemoReducer, { assets: [] });

  const handleUpdateAsset = (asset: Asset) => {
    dispatch({ type: 'update', asset });
  };

  return (
    <div className="App" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color:'black'
    }}>
      <h1>💰 Smart Portfolio Dashboard</h1>
      <p>Complete TypeScript + React.FC + React.Component demo</p>
      
      <AssetEditor onUpdate={handleUpdateAsset} />
      
      <PortfolioSummary assets={state.assets} />
      
      {state.assets.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>📋 Current Assets</h3>
          <ul style={{ paddingLeft: '20px' }}>
            {state.assets.map(asset => (
              <li key={asset.symbol} style={{ margin: '10px 0', padding: '10px', background: '#f8f9fa' }}>
                <strong>{asset.name}</strong> ({asset.symbol}): 
                <span style={{ color: asset.change >= 0 ? 'green' : 'red' }}>
                  ${asset.value.toFixed(2)} ({asset.change > 0 ? '+' : ''}{asset.change}%)
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
