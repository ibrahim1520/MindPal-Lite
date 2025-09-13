import type { MoodEntry } from '../types'


const KEYS = {
ENTRIES: 'mindpal.entries.v1',
}


export function loadEntries(): MoodEntry[] {
const raw = localStorage.getItem(KEYS.ENTRIES)
if (!raw) return []
try { return JSON.parse(raw) as MoodEntry[] } catch { return [] }
}


export function saveEntries(entries: MoodEntry[]) {
localStorage.setItem(KEYS.ENTRIES, JSON.stringify(entries))
}


export function upsertEntry(entry: MoodEntry) {
const entries = loadEntries()
const idx = entries.findIndex(e => e.date === entry.date)
if (idx >= 0) entries[idx] = entry; else entries.push(entry)
entries.sort((a,b) => a.date.localeCompare(b.date))
saveEntries(entries)
return entries
}