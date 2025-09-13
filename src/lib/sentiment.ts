import type { SentimentLabel } from '../types'


// Simple keyword fallback for fully-offline usage
const LOCAL_LEXICON: Record<SentimentLabel, string[]> = {
POSITIVE: ['happy','grateful','good','calm','proud','relaxed','hopeful'],
NEGATIVE: ['sad','anxious','angry','bad','tired','stressed','overwhelmed','lonely'],
NEUTRAL: ['okay','fine','normal','average']
}


function localClassify(text: string): { label: SentimentLabel, score: number } {
const t = text.toLowerCase()
let pos = 0, neg = 0
LOCAL_LEXICON.POSITIVE.forEach(w => { if (t.includes(w)) pos++ })
LOCAL_LEXICON.NEGATIVE.forEach(w => { if (t.includes(w)) neg++ })
if (pos === 0 && neg === 0) return { label: 'NEUTRAL', score: 0.5 }
const score = Math.min(1, Math.max(0.55, (pos > neg ? pos/(pos+neg) : neg/(pos+neg))))
return { label: pos >= neg ? 'POSITIVE' : 'NEGATIVE', score }
}


export async function detectSentiment(text: string): Promise<{ label: SentimentLabel, score: number, source: 'huggingface'|'local' }>{
const token = import.meta.env.VITE_HF_TOKEN as string | undefined
const model = 'finiteautomata/bertweet-base-sentiment-analysis' // solid, free
if (!token) {
return { ...localClassify(text), source: 'local' }
}
try {
const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
method: 'POST',
headers: {
'Authorization': `Bearer ${token}`,
'Content-Type': 'application/json'
},
body: JSON.stringify({ inputs: text })
})
if (!res.ok) throw new Error('HF API error')
const data = await res.json()
// HF returns array of [{label, score}] or nested arrays depending on pipeline
const pred = Array.isArray(data) ? (Array.isArray(data[0]) ? data[0][0] : data[0]) : data
const labelRaw = String(pred.label || 'NEUTRAL').toUpperCase()
const map: Record<string, SentimentLabel> = { 'POS': 'POSITIVE', 'NEG': 'NEGATIVE', 'NEU': 'NEUTRAL', 'POSITIVE': 'POSITIVE', 'NEGATIVE': 'NEGATIVE', 'NEUTRAL': 'NEUTRAL' }
const label = map[labelRaw] ?? 'NEUTRAL'
const score = Number(pred.score ?? 0.5)
return { label, score, source: 'huggingface' }
} catch (e) {
return { ...localClassify(text), source: 'local' }
}
}


export function copingTips(label: SentimentLabel): string[] {
if (label === 'POSITIVE') return [
'Capture what went well in a gratitude note',
'Share a kind message with someone you care about',
'Take a mindful walk to savor the moment'
]
if (label === 'NEGATIVE') return [
'Try 4-7-8 breathing for 1 minute',
'Step outside for fresh air and a short walk',
'Write down one worry, then one small next step'
]
return [
'Take a 5-minute stretch break',
'Drink a glass of water slowly and mindfully',
'Play calming music for a few minutes'
]
}