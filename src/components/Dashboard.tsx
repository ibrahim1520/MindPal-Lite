import { useMemo } from 'react'
import dayjs from 'dayjs'
import CalendarMood from './CalendarMood'
import StreakBadges from './StreakBadges'
import type { MoodEntry } from '../types'
import { calcStreak, downloadICS } from '../lib/utils'


export default function Dashboard({ entries }: { entries: MoodEntry[] }) {
const dates = useMemo(()=> entries.map(e=>e.date), [entries])
const streak = useMemo(()=> calcStreak(dates), [dates])
const last = entries[entries.length - 1]


return (
<div className="grid md:grid-cols-2 gap-6">
<div className="space-y-6">
<StreakBadges streak={streak} />
<div className="card">
<div className="flex items-center justify-between">
<div>
<h3 className="text-lg font-semibold">Daily Check‑in</h3>
<p className="text-muted">Download a recurring reminder to your calendar.</p>
</div>
<button className="btn-ghost" onClick={()=>downloadICS('MindPal Daily Check‑in', '09:00')}>📅 Download .ics</button>
</div>
</div>
{last && (
<div className="card">
<p className="text-sm text-muted">Last entry</p>
<p className="mt-1 font-medium">{dayjs(last.date).format('MMM DD, YYYY')}</p>
<p className="mt-2">{last.text}</p>
<p className="mt-2 text-sm">Sentiment: <b>{last.sentiment}</b> ({Math.round(last.score*100)}%)</p>
</div>
)}
</div>
<CalendarMood entries={entries} />
</div>
)
}