import dayjs from 'dayjs'


export function todayISO() {
return dayjs().format('YYYY-MM-DD')
}


export function calcStreak(datesISO: string[]): number {
if (datesISO.length === 0) return 0
const set = new Set(datesISO)
let streak = 0
let cursor = dayjs()
while (set.has(cursor.format('YYYY-MM-DD'))) {
streak += 1
cursor = cursor.subtract(1, 'day')
}
return streak
}


export function badgeForStreak(streak: number): string | null {
if (streak >= 10) return '🏅 Day 10 Badge'
if (streak >= 5) return '🥇 Day 5 Badge'
if (streak >= 1) return '🎉 Day 1 Badge'
return null
}


export function moodColor(sentiment: 'POSITIVE'|'NEGATIVE'|'NEUTRAL') {
switch (sentiment) {
case 'POSITIVE': return 'bg-mood-positive'
case 'NEGATIVE': return 'bg-mood-negative'
default: return 'bg-mood-neutral'
}
}


export function downloadICS(title: string, time = '09:00') {
const dtstart = dayjs().format('YYYYMMDD') + 'T' + time.replace(':','') + '00'
const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//MindPal Lite//EN\nBEGIN:VEVENT\nDTSTART:${dtstart}\nRRULE:FREQ=DAILY\nSUMMARY:${title}\nEND:VEVENT\nEND:VCALENDAR`
const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'mindpal-daily-checkin.ics'
a.click()
URL.revokeObjectURL(url)
}