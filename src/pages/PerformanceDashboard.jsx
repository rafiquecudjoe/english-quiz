import { Link } from 'react-router-dom';

const skills = [
  { name: 'Vocabulary', score: 85, change: '+2% this week', color: 'primary' },
  { name: 'Grammar', score: 62, change: '-1% this week', color: 'error' },
  { name: 'Comprehension', score: 90, change: '+5% this week', color: 'success' },
];

const weeklyData = [
  { day: 'MON', value: 45 },
  { day: 'TUE', value: 60 },
  { day: 'WED', value: 35 },
  { day: 'THU', value: 80 },
  { day: 'FRI', value: 55 },
  { day: 'SAT', value: 70 },
  { day: 'SUN', value: 90, active: true },
];

const leaderboard = [
  { rank: 1, name: 'Sarah M.', xp: '13.2k', avatar: 'SM' },
  { rank: 2, name: 'John D.', xp: '12.9k', avatar: 'JD' },
  { rank: 3, name: 'Emily R.', xp: '12.5k', avatar: 'ER' },
  { rank: 4, name: 'You', xp: '12.4k', avatar: 'AS', isYou: true },
  { rank: 5, name: 'Mike T.', xp: '11.8k', avatar: 'MT' },
];

const badges = [
  { name: 'Grammar Guru', icon: 'psychology', color: 'primary', earned: true },
  { name: 'Vocab Master', icon: 'spellcheck', color: 'purple', earned: true },
  { name: 'Perfect Talk', icon: 'record_voice_over', color: 'teal', earned: true },
  { name: 'Fast Learner', icon: 'speed', color: 'orange', earned: false },
  { name: 'Author', icon: 'edit_note', color: 'blue', earned: false },
];

export default function PerformanceDashboard() {
  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Performance Dashboard
            </h1>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              14 Day Streak
            </span>
          </div>
          <p className="text-text-muted">Track your progress, analyze strengths, and climb the leaderboard.</p>
        </div>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-dark rounded-2xl p-6 border border-white/5 flex items-center gap-4">
          <div className="relative">
            <svg className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" className="text-surface-light" />
              <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="none" 
                strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * 0.25}
                className="text-primary" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-text-muted text-sm">Total XP</p>
            <p className="text-white text-2xl font-bold">12,450 <span className="text-success text-sm">+150 today</span></p>
          </div>
        </div>
        <div className="bg-surface-dark rounded-2xl p-6 border border-white/5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-3xl">verified</span>
          </div>
          <div>
            <p className="text-text-muted text-sm">Current Level</p>
            <p className="text-white text-2xl font-bold">B2 Upper</p>
            <p className="text-text-muted text-xs">75% to C1</p>
          </div>
        </div>
        <div className="bg-surface-dark rounded-2xl p-6 border border-white/5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-success text-3xl">timer</span>
          </div>
          <div>
            <p className="text-text-muted text-sm">Study Time</p>
            <p className="text-white text-2xl font-bold">42.5h <span className="text-success text-sm">+1.2h today</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills & Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Breakdown */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-bold">Skill Breakdown</h3>
              <div className="flex bg-surface-light rounded-lg p-1">
                {['Week', 'Month', 'Year'].map((period, i) => (
                  <button key={period} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}>
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Circular Progress */}
            <div className="flex justify-center gap-8 mb-8">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-3">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-surface-light" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" 
                        strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - skill.score / 100)}
                        className={skill.color === 'primary' ? 'text-primary' : skill.color === 'success' ? 'text-success' : 'text-error'} 
                        strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-white">{skill.score}%</span>
                    </div>
                  </div>
                  <span className="text-white font-medium text-sm">{skill.name}</span>
                  <span className={`text-xs ${skill.change.includes('+') ? 'text-success' : 'text-error'}`}>{skill.change}</span>
                </div>
              ))}
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-32 gap-2">
              {weeklyData.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-2 w-full">
                  <div 
                    className={`w-full max-w-[32px] ${item.active ? 'bg-success' : 'bg-surface-light hover:bg-primary/50'} transition-all rounded-t-md`}
                    style={{ height: `${item.value}%` }}
                  ></div>
                  <span className={`text-[10px] uppercase font-bold ${item.active ? 'text-success' : 'text-text-muted'}`}>{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Area */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-error text-2xl">warning</span>
              </div>
              <div>
                <h4 className="text-white font-bold">Focus on: Past Tense Verbs</h4>
                <p className="text-text-muted text-sm">Your Grammar score dropped by 5% this week due to irregular verbs.</p>
              </div>
            </div>
            <Link to="/grammar" className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all">
              <span className="material-symbols-outlined text-[18px]">school</span>
              Practice Now
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Leaderboard */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Leaderboard</h3>
              <Link to="/leaderboard" className="text-xs text-primary hover:underline">View All</Link>
            </div>
            <div className="flex gap-1 mb-4">
              {['Friends', 'Class', 'Global'].map((tab, i) => (
                <button key={tab} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-surface-light text-text-muted hover:text-white'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-2 rounded-xl ${user.isYou ? 'bg-primary/10 border border-primary/20' : ''}`}>
                  <span className={`w-6 text-center font-bold ${user.rank <= 3 ? 'text-warning' : 'text-text-muted'}`}>{user.rank}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.isYou ? 'bg-primary text-white' : 'bg-surface-light text-text-muted'}`}>
                    {user.avatar}
                  </div>
                  <span className={`flex-1 font-medium ${user.isYou ? 'text-primary' : 'text-white'}`}>{user.name}</span>
                  <span className="text-text-muted text-sm">{user.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Recent Badges</h3>
              <span className="text-xs text-text-muted">12/50</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <div key={badge.name} className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.earned ? `bg-${badge.color === 'primary' ? 'primary' : badge.color + '-500'}/20` : 'bg-surface-light grayscale opacity-50'}`}>
                  <span className={`material-symbols-outlined text-xl ${badge.earned ? (badge.color === 'primary' ? 'text-primary' : `text-${badge.color}-400`) : 'text-text-muted'}`}>
                    {badge.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
