export interface PostTextSimilarity {
  text1: string,
  text2: string,
  token: string,
  similarity: number
}

export interface GetLanguage {
  text: string,
  detectedLangs: {lang: string, confidence: number}[]
}

export interface GetEntityExtraction {
  text: string,
  min_confidence: number,
  annotations: {label: string, categories: string, abstract: string, image: any}[]
}

export interface getSentimentAnalysis {
  text: string,
  timestamp: string,
  sentiment: {score: number, type: string}[]
}
