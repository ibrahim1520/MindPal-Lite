import { badgeForStreak } from '../lib/utils'


export default function StreakBadges({ streak }: { streak: number }) {
const badge = badgeForStreak(streak)
return (
<div className="card flex items-center justify-between">
<div>
<p className="text-sm text-muted">Current streak</p>
<p className="text-3xl font-bold">{streak} day{streak===1?'':'s'}</p>
</div>
<div className="text-right">
{badge ? (
<span className="badge">{badge}</span>
) : (
<span className="badge">Let\'s start a streak! 🌱</span>
)}
</div>
</div>
)
}