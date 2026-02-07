import React from 'react';
import type { AssetEditorProps, AssetEditorState } from '../types/asset';

class AssetEditor extends React.Component<AssetEditorProps, AssetEditorState> {
  state: AssetEditorState = { 
    name: '', 
    symbol: '', 
    value: '', 
    change: '' 
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as Pick<AssetEditorState, keyof AssetEditorState>);
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const valueNum = parseFloat(this.state.value);
    const changeNum = parseFloat(this.state.change);
    
    if (isNaN(valueNum) || isNaN(changeNum) || !this.state.name || !this.state.symbol) {
      alert('Fill all fields with valid numbers');
      return;
    }

    this.props.onUpdate({
      name: this.state.name,
      symbol: this.state.symbol,
      value: valueNum,
      change: changeNum
    });

    this.setState({ name: '', symbol: '', value: '', change: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ 
        padding: '20px', 
        border: '2px solid #007bff', 
        borderRadius: '8px',
        margin: '10px 0'
      }}>
        <h3>Edit Asset</h3>
        <div style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
          <input
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Asset Name (e.g., Apple)"
            style={{ padding: '10px' }}
            required
          />
          <input
            name="symbol"
            value={this.state.symbol}
            onChange={this.handleChange}
            placeholder="Symbol (e.g., AAPL)"
            style={{ padding: '10px' }}
            required
          />
          <input
            name="value"
            type="number"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="Current Value (e.g., 150.50)"
            step="0.01"
            style={{ padding: '10px' }}
            required
          />
          <input
            name="change"
            type="number"
            value={this.state.change}
            onChange={this.handleChange}
            placeholder="Change % (e.g., 2.5 or -1.2)"
            step="0.01"
            style={{ padding: '10px' }}
            required
          />
          <button 
            type="submit" 
            style={{ 
              padding: '12px', 
              background: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Update Asset
          </button>
        </div>
      </form>
    );
  }
}

export default AssetEditor;
