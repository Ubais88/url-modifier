export interface ReplacementPair {
  id: string;
  key: string;
  value: string;
  createdAt: number;
}

export interface HistoryItem {
  id: string;
  original: string;
  replaced: string;
  timestamp: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export type Theme = 'light' | 'dark';