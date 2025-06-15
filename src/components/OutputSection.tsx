import React from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface OutputSectionProps {
  outputText: string;
  onCopy: () => void;
  copied: boolean;
}

export function OutputSection({ outputText, onCopy, copied }: OutputSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Output Result
        </h2>
        <button
          onClick={onCopy}
          disabled={!outputText}
          className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {copied ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      
      <div className="relative">
        <textarea
          value={outputText}
          readOnly
          placeholder="Replaced text will appear here..."
          className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-mono text-sm"
        />
        {outputText && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-md">
            {outputText.length} chars
          </div>
        )}
      </div>
    </div>
  );
}