import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  callback: () => void;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlKeyMatch = shortcut.ctrlKey === undefined || shortcut.ctrlKey === event.ctrlKey;
        const altKeyMatch = shortcut.altKey === undefined || shortcut.altKey === event.altKey;
        const shiftKeyMatch = shortcut.shiftKey === undefined || shortcut.shiftKey === event.shiftKey;
        
        if (
          event.key === shortcut.key &&
          ctrlKeyMatch &&
          altKeyMatch &&
          shiftKeyMatch
        ) {
          event.preventDefault();
          shortcut.callback();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}