import { useEffect, useState } from 'react'
import JournalEntryForm from './components/JournalEntryForm'
import Dashboard from './components/Dashboard'
import { loadEntries } from './lib/storage'
import type { MoodEntry } from './types'
import './styles.css'


export default function App() {
const [entries, setEntries] = useState<MoodEntry[]>([])


useEffect(() => {
setEntries(loadEntries())
}, [])


return (
<div className="min-h-screen">
<header className="sticky top-0 z-10 bg-gradient-to-r from-mint-50 via-sky-50 to-lavender-50/80 border-b border-slate-200/70 backdrop-blur">
<div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
<h1 className="text-2xl font-bold">MindPal Lite</h1>
<a className="btn-ghost" href="https://huggingface.co" target="_blank" rel="noreferrer">🤗 Hugging Face</a>
</div>
</header>


<main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
<JournalEntryForm onSaved={()=>setEntries(loadEntries())} />
<Dashboard entries={entries} />
<footer className="text-center text-muted text-sm py-6">
Built with ❤️ for wellbeing. Your data stays in your browser.
</footer>
</main>
</div>
)
}