export type ToneLabel = 'Muy Informal' | 'Informal' | 'Formal' | 'Muy Formal';
export interface UserSettings {
  length: number;       // longitud del texto (entre 120 y 1024)
  tone: ToneLabel; // tono del texto
  emojis: boolean;      // si se usan emojis
  hashtags: boolean;     // si se usan hashtags
}