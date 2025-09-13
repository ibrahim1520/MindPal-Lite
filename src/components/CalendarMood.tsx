import dayjs from 'dayjs'
import { moodColor } from '../lib/utils'
import type { MoodEntry } from '../types'


export default function CalendarMood({ entries }: { entries: MoodEntry[] }) {
const byDate = new Map(entries.map(e => [e.date, e]))
const start = dayjs().startOf('month')
const end = dayjs().endOf('month')
const days: { date: string, entry?: MoodEntry }[] = []
for (let d = start; d.isBefore(end) || d.isSame(end, 'day'); d = d.add(1,'day')) {
const iso = d.format('YYYY-MM-DD')
days.push({ date: iso, entry: byDate.get(iso) })
}
const weekday = start.day() // 0..6


return (
<div className="card">
<h3 className="text-lg font-semibold mb-3">This Month</h3>
<div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-muted">
{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(w => <div key={w}>{w}</div>)}
</div>
<div className="grid grid-cols-7 gap-2">
{Array.from({length: weekday}).map((_,i)=> <div key={'pad'+i}></div>)}
{days.map(d => (
<div key={d.date} className={`aspect-square rounded-xl border border-slate-200 flex items-center justify-center ${d.entry ? moodColor(d.entry.sentiment) : 'bg-white'}`}
title={d.entry ? `${d.entry.sentiment} (${Math.round(d.entry.score*100)}%)` : d.date}>
<span className="text-xs font-medium">
{dayjs(d.date).date()}
</span>
</div>
))}
</div>
</div>
)
}