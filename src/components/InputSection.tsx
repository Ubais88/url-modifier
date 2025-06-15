import { RotateCcw, Zap, Shuffle } from 'lucide-react';

interface InputSectionProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onReplace: () => void;
  onClear: () => void;
  onLocalhostPreset: () => void;
  onRandomTokenPreset: () => void;
}

export function InputSection({
  inputText,
  onInputChange,
  onReplace,
  onClear,
  onLocalhostPreset,
  onRandomTokenPreset,
}: InputSectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Input URL/Text
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onLocalhostPreset}
            className="px-3 py-1.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-200 flex items-center space-x-1"
          >
            <Zap className="w-3 h-3" />
            <span>Localhost</span>
          </button>
          <button
            onClick={onRandomTokenPreset}
            className="px-3 py-1.5 text-xs font-medium bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-md hover:bg-teal-200 dark:hover:bg-teal-900/50 transition-colors duration-200 flex items-center space-x-1"
          >
            <Shuffle className="w-3 h-3" />
            <span>Random Token</span>
          </button>
        </div>
      </div>
      
      <textarea
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Paste your survey URL or any text string here..."
        className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
        autoFocus
      />
      
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Ctrl+Enter</kbd> to replace, 
          <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono ml-1">Esc</kbd> to clear
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={onClear}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
          <button
            onClick={onReplace}
            disabled={!inputText.trim()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 disabled:cursor-not-allowed"
          >
            Replace Text
          </button>
        </div>
      </div>
    </div>
  );
}