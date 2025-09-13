import { useEffect, useMemo, useState } from 'react'
import { detectSentiment, copingTips } from '../lib/sentiment'
import { todayISO } from '../lib/utils'
import { upsertEntry } from '../lib/storage'
import type { MoodEntry } from '../types'


export default function JournalEntryForm({ onSaved }: { onSaved: (e: MoodEntry)=>void }) {
const [text, setText] = useState('')
const [loading, setLoading] = useState(false)
const [suggestions, setSuggestions] = useState<string[]>([])


const placeholder = useMemo(() => {
const ideas = [
'I feel…',
'Today I noticed…',
'Right now my body feels…',
'One small win today was…'
]
return ideas[Math.floor(Math.random()*ideas.length)]
}, [])


useEffect(() => {
// lightweight smart suggestion (based on last few words)
const last = text.trim().toLowerCase()
if (!last) { setSuggestions([]); return }
const seed = last.includes('sad') || last.includes('anxious') ? 'NEGATIVE' : last.includes('happy') ? 'POSITIVE' : 'NEUTRAL'
setSuggestions(copingTips(seed as any))
}, [text])


async function handleSave() {
if (!text.trim()) return
setLoading(true)
const senti = await detectSentiment(text)
const entry: MoodEntry = {
id: todayISO(),
date: todayISO(),
text: text.trim(),
sentiment: senti.label,
score: senti.score
}
const all = upsertEntry(entry)
setLoading(false)
setText('')
onSaved(entry)
}


return (
<div className="card space-y-4">
<div>
<h2 className="text-xl font-semibold">Daily Journal</h2>
<p className="text-muted">Write a short note about how you feel today. MindPal will gently detect the tone and suggest supportive ideas.</p>
</div>
<textarea
className="input min-h-[120px]"
placeholder={placeholder}
value={text}
onChange={(e)=>setText(e.target.value)}
/>
{suggestions.length > 0 && (
<div className="bg-lavender-50 border border-indigo-100 rounded-xl p-3">
<p className="font-medium mb-1">Suggestions</p>
<ul className="list-disc list-inside text-sm text-slate-700">
{suggestions.map(s => <li key={s}>{s}</li>)}
</ul>
</div>
)}
<div className="flex gap-3">
<button className="btn-primary" onClick={handleSave} disabled={loading}>
{loading ? 'Analyzing…' : 'Save today\'s entry'}
</button>
<span className="text-sm text-muted">Sentiment via Hugging Face if token is set; otherwise local offline logic.</span>
</div>
</div>
)
}