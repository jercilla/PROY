export interface HistoryItem {
  id: string;           // id del item de historial
  user_id: string;      // id del usuario
  trend_id: string;     // id del trend
  text: string;         // texto generado
  length: number;       // longitud del texto (entre 120 y 1024)
  tone: 'Muy Informal' | 'Informal' | 'Formal' | 'Muy Formal'; // tono del texto
  emojis: boolean;      // si se usan emojis
  hashtag: boolean;     // si se usan hashtags
  created_at: string;   // fecha de creación
}