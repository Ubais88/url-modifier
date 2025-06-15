import React, { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import { ReplacementPair } from '../types';

interface ReplacementManagerProps {
  replacements: ReplacementPair[];
  onAdd: (key: string, value: string) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export function ReplacementManager({
  replacements,
  onAdd,
  onRemove,
  onClearAll,
}: ReplacementManagerProps) {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKey.trim() && newValue.trim()) {
      onAdd(newKey.trim(), newValue.trim());
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Replacement Rules
        </h2>
        {replacements.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Find (Key)
            </label>
            <input
              type="text"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              placeholder="e.g., https://bb-dc-app.azurewebsites.net"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Replace with (Value)
            </label>
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="e.g., http://localhost:5173"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!newKey.trim() || !newValue.trim()}
          className="mt-4 w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Replacement</span>
        </button>
      </form>

      {replacements.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Active Replacements ({replacements.length})
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {replacements.map((replacement) => (
              <div
                key={replacement.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {replacement.key}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    → {replacement.value}
                  </div>
                </div>
                <button
                  onClick={() => onRemove(replacement.id)}
                  className="ml-3 p-1 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}