export interface HistoryItem {
  id: string; // History item ID
  user_id: string; // User ID
  trend_id: string; // Trend ID
  text: string; // Generated text
  length: number; // Text length (between 120 and 1024)
  tone: 'Muy Informal' | 'Informal' | 'Formal' | 'Muy Formal'; // Text tone
  emojis: boolean; // Whether emojis are used
  hashtag: boolean; // Whether hashtags are used
  created_at: string; // Creation date
}

export interface CreateHistoryItemDto {
  trend_id: string; // Trend ID
  text: string; // Generated text
  length: number; // Text length (between 120 and 1024)
  tone: string; // Text tone
  emojis: boolean; // Whether emojis are used
  hashtag: boolean; // Whether hashtags are used
}
