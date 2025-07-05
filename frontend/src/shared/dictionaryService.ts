// Free Dictionary API endpoint (for getWordDefinition only)
const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
}

export interface DictionaryError {
  title: string;
  message: string;
  resolution: string;
}

// Check if a word exists in the dictionary (calls our API route)
export async function isValidDictionaryWord(word: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/validate-word?word=${encodeURIComponent(word)}`);
    const data = await res.json();
    return !!data.valid;
  } catch (e) {
    // Fail open
    return true;
  }
}

// Get detailed information about a word (still uses axios)
import axios from 'axios';
export async function getWordDefinition(word: string): Promise<DictionaryResponse | null> {
  try {
    const response = await axios.get<DictionaryResponse[]>(`${DICTIONARY_API_URL}/${word.toLowerCase()}`);
    return response.status === 200 && response.data.length > 0 ? response.data[0] : null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.warn('Dictionary API error:', error);
    return null;
  }
}

// Cache for dictionary lookups to avoid repeated API calls
const wordCache = new Map<string, { isValid: boolean; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Cached version of word validation
export async function isValidDictionaryWordCached(word: string): Promise<boolean> {
  const now = Date.now();
  const cached = wordCache.get(word.toLowerCase());
  
  // Return cached result if it's still valid
  if (cached && (now - cached.timestamp) < CACHE_DURATION) {
    return cached.isValid;
  }
  
  // Fetch from API and cache the result
  const isValid = await isValidDictionaryWord(word);
  wordCache.set(word.toLowerCase(), { isValid, timestamp: now });
  
  return isValid;
}

// Clear the cache (useful for testing or if cache gets too large)
export function clearDictionaryCache(): void {
  wordCache.clear();
}

// Get cache statistics
export function getDictionaryCacheStats(): { size: number; entries: string[] } {
  return {
    size: wordCache.size,
    entries: Array.from(wordCache.keys())
  };
} 