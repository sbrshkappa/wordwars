import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DICTIONARY_API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const word = searchParams.get('word');
  if (!word) {
    return NextResponse.json({ valid: false, error: 'No word provided' }, { status: 400 });
  }

  try {
    const response = await axios.get(`${DICTIONARY_API_URL}/${word.toLowerCase()}`);
    if (response.status === 200 && response.data.length > 0) {
      return NextResponse.json({ valid: true });
    }
    return NextResponse.json({ valid: false });
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return NextResponse.json({ valid: false });
    }
    // For other errors, allow the word (fail open)
    return NextResponse.json({ valid: true, warning: 'Dictionary API error, allowing word.' });
  }
} 