import React from 'react';
import { Clock, Trash2, Copy } from 'lucide-react';
import { HistoryItem } from '../types';
import { formatTimestamp } from '../utils/textReplacer';

interface HistorySectionProps {
  history: HistoryItem[];
  onClearHistory: () => void;
  onCopyHistoryItem: (text: string) => void;
}

export function HistorySection({ history, onClearHistory, onCopyHistoryItem }: HistorySectionProps) {
  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Session History
        </h2>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No replacements yet in this session</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Session History ({history.length})
        </h2>
        <button
          onClick={onClearHistory}
          className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200 flex items-center space-x-1"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatTimestamp(item.timestamp)}
              </span>
              <button
                onClick={() => onCopyHistoryItem(item.replaced)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Original:</div>
                <div className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 truncate">
                  {item.original}
                </div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Replaced:</div>
                <div className="text-sm text-gray-800 dark:text-gray-200 font-mono bg-white dark:bg-gray-800 p-2 rounded border border-gray-200 dark:border-gray-600 truncate">
                  {item.replaced}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}