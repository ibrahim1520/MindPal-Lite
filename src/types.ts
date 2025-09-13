export type SentimentLabel = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL'


export interface MoodEntry {
id: string
date: string // yyyy-mm-dd
text: string
sentiment: SentimentLabel
score: number // 0..1
}