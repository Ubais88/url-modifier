import { ReplacementPair } from '../types';

export function applyReplacements(text: string, replacements: ReplacementPair[]): string {
  let result = text;
  
  for (const replacement of replacements) {
    if (replacement.key && replacement.value !== undefined) {
      const regex = new RegExp(escapeRegExp(replacement.key), 'g');
      result = result.replace(regex, replacement.value);
    }
  }
  
  return result;
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function generateRandomToken(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp).toLocaleString();
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}