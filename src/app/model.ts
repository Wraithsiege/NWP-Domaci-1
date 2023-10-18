export interface PostTextSimilarity {
  text1: string,
  text2: string,
  token: string,
  similarity: number
}

export interface GetLanguage {
  text: string,
  textCleaner: boolean,
  detectedLangs: {lang: string, confidence: number}[],
  lang: string,
  confidence: number,
  final: string
}
