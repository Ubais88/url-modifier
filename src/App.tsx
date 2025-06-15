import { useState, useCallback, useEffect } from 'react';
import { Wrench, Github } from 'lucide-react';
import { InputSection } from './components/InputSection';
import { ReplacementManager } from './components/ReplacementManager';
import { OutputSection } from './components/OutputSection';
import { HistorySection } from './components/HistorySection';
import { ThemeToggle } from './components/ThemeToggle';
import { Toast } from './components/Toast';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useSessionStorage } from './hooks/useSessionStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { applyReplacements, generateRandomToken, copyToClipboard } from './utils/textReplacer';
import { ReplacementPair, HistoryItem, ToastMessage, Theme } from './types';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [replacements, setReplacements] = useLocalStorage<ReplacementPair[]>('replacements', []);
  const [history, setHistory] = useSessionStorage<HistoryItem[]>('history', []);
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Toast management
  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const toast: ToastMessage = {
      id: Date.now().toString(),
      message,
      type,
    };
    setToasts(prev => [...prev, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Replacement functions
  const handleReplace = useCallback(() => {
    if (!inputText.trim()) return;

    const replaced = applyReplacements(inputText, replacements);
    setOutputText(replaced);

    // Add to history
    const historyItem: HistoryItem = {
      id: Date.now().toString(),
      original: inputText,
      replaced,
      timestamp: Date.now(),
    };
    setHistory(prev => [historyItem, ...prev]);

    if (replaced !== inputText) {
      addToast('Text replaced successfully!', 'success');
    } else {
      addToast('No replacements found', 'info');
    }
  }, [inputText, replacements, setHistory, addToast]);

  const handleCopy = useCallback(async () => {
    if (!outputText) return;

    const success = await copyToClipboard(outputText);
    if (success) {
      setCopied(true);
      addToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } else {
      addToast('Failed to copy to clipboard', 'error');
    }
  }, [outputText, addToast]);

  const handleCopyHistoryItem = useCallback(async (text: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      addToast('Copied to clipboard!', 'success');
    } else {
      addToast('Failed to copy to clipboard', 'error');
    }
  }, [addToast]);

  const handleClear = useCallback(() => {
    setInputText('');
    setOutputText('');
    addToast('Input cleared', 'info');
  }, [addToast]);

  // Replacement management
  const addReplacement = useCallback((key: string, value: string) => {
    const newReplacement: ReplacementPair = {
      id: Date.now().toString(),
      key,
      value,
      createdAt: Date.now(),
    };
    setReplacements(prev => [...prev, newReplacement]);
    addToast('Replacement rule added!', 'success');
  }, [setReplacements, addToast]);

  const removeReplacement = useCallback((id: string) => {
    setReplacements(prev => prev.filter(r => r.id !== id));
    addToast('Replacement rule removed', 'info');
  }, [setReplacements, addToast]);

  const clearAllReplacements = useCallback(() => {
    setReplacements([]);
    addToast('All replacement rules cleared', 'info');
  }, [setReplacements, addToast]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    addToast('History cleared', 'info');
  }, [setHistory, addToast]);

  // Preset functions
  const handleLocalhostPreset = useCallback(() => {
    const commonProductions = [
      "https://bb-dc-app.azurewebsites.net",
    ];
    
    const localhost = 'http://localhost:5173';
    
    commonProductions.forEach(prod => {
      const exists = replacements.some(r => r.key === prod);
      if (!exists) {
        addReplacement(prod, localhost);
      }
    });
  }, [replacements, addReplacement]);

  const handleRandomTokenPreset = useCallback(() => {
    const token = generateRandomToken();
    const exists = replacements.some(r => r.key === '[#token#]');
    if (!exists) {
      addReplacement('[#token#]', token);
    } else {
      // Update existing token
      setReplacements(prev => 
        prev.map(r => r.key === '[#token#]' ? { ...r, value: token } : r)
      );
      addToast('Random token updated!', 'success');
    }
  }, [replacements, addReplacement, setReplacements, addToast]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'Enter',
      ctrlKey: true,
      callback: handleReplace,
    },
    {
      key: 'Escape',
      callback: handleClear,
    },
  ]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Wrench className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  URL Modifier Tool
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Easily adjust parts of a URL for development or testing
                  purposes
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/ubais88"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            <InputSection
              inputText={inputText}
              onInputChange={setInputText}
              onReplace={handleReplace}
              onClear={handleClear}
              onLocalhostPreset={handleLocalhostPreset}
              onRandomTokenPreset={handleRandomTokenPreset}
            />

            <OutputSection
              outputText={outputText}
              onCopy={handleCopy}
              copied={copied}
            />
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <ReplacementManager
              replacements={replacements}
              onAdd={addReplacement}
              onRemove={removeReplacement}
              onClearAll={clearAllReplacements}
            />

            <HistorySection
              history={history}
              onClearHistory={clearHistory}
              onCopyHistoryItem={handleCopyHistoryItem}
            />
          </div>
        </div>
      </main>

      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </div>
  );
}

export default App;