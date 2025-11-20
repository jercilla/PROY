export interface UserSettings {
  length: number;       // longitud del texto (entre 120 y 1024)
  tone: 'Muy Informal' | 'Informal' | 'Formal' | 'Muy Formal'; // tono del texto
  emojis: boolean;      // si se usan emojis
  hashtag: boolean;     // si se usan hashtags
}