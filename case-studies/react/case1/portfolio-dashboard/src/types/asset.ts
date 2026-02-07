// All shared types in ONE place
export interface Asset {
  name: string;
  symbol: string;
  value: number;
  change: number;
}

export interface PortfolioSummaryProps {
  assets: Asset[];
}

export interface AssetEditorProps {
  onUpdate: (asset: Asset) => void;
}

export interface AssetEditorState {
  name: string;
  symbol: string;
  value: string;
  change: string;
}
