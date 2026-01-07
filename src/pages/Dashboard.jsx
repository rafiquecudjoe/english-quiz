import { Link } from 'react-router-dom';

const stats = [
  { label: 'Current Level', value: 'Intermediate', icon: 'verified', color: 'primary', trend: '+10% progress', trendUp: true },
  { label: 'Total XP', value: '1,250 XP', icon: 'bolt', color: 'purple', trend: '+150 today', trendUp: true },
  { label: 'Daily Streak', value: '5 Days', icon: 'local_fire_department', color: 'orange', trend: "Don't break it!", trendUp: null },
];

const studyAreas = [
  { 
    title: 'Writing Section', 
    description: 'Practice essay structure, creative writing prompts, and improve your sentence variety.',
    icon: 'edit_note',
    color: 'primary',
    path: '/writing'
  },
  { 
    title: 'Comprehension & Use', 
    description: 'Dive into reading passages, grammar drills, and context clues exercises.',
    icon: 'menu_book',
    color: 'blue',
    path: '/comprehension'
  },
];

const weeklyData = [
  { day: 'M', value: 45 },
  { day: 'T', value: 70 },
  { day: 'W', value: 55 },
  { day: 'T', value: 90, active: true },
  { day: 'F', value: 65 },
  { day: 'S', value: 40 },
  { day: 'S', value: 25 },
];

const colorConfig = {
  primary: { text: 'text-primary', bg: 'bg-primary', bgLight: 'bg-primary/10', gradient: 'from-primary/20 to-blue-500/10' },
  purple: { text: 'text-purple-400', bg: 'bg-purple-500', bgLight: 'bg-purple-500/10', gradient: 'from-purple-500/20 to-pink-500/10' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500', bgLight: 'bg-orange-500/10', gradient: 'from-orange-500/20 to-yellow-500/10' },
};

export default function Dashboard() {
  return (
    <div className="h-full lg:overflow-hidden overflow-y-auto p-4 md:p-6 lg:p-8">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-4 md:gap-6 lg:h-full">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Welcome back, Alex!
          </h1>
          <p className="text-text-muted text-base">
            You are on a <span className="text-primary font-bold">5-day streak</span>. Keep it up!
          </p>
        </div>

      </header>

      {/* Stats Grid - Enhanced */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const colors = colorConfig[stat.color];
          return (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-2xl p-6 bg-surface-light border border-white/5 shadow-lg relative overflow-hidden group hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Gradient background blur */}
              <div className={`absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br ${colors.gradient} rounded-full blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-75`}></div>
              
              <div className="relative z-10 flex flex-col gap-1">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-text-muted text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                  {/* Icon with background circle */}
                  <div className={`w-10 h-10 rounded-xl ${colors.bgLight} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`material-symbols-outlined ${colors.text} fill`}>{stat.icon}</span>
                  </div>
                </div>
                <p className="text-white text-3xl font-bold">{stat.value}</p>
                <p className={`text-sm font-medium flex items-center gap-1 mt-1 ${colors.text}`}>
                  {stat.trendUp !== null && (
                    <span className="material-symbols-outlined text-[16px]">
                      {stat.trendUp ? 'trending_up' : 'trending_down'}
                    </span>
                  )}
                  {stat.trend}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Progress */}
        <div className="bg-surface-light rounded-2xl p-6 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-lg font-bold">Level Progress</h3>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold shadow-[0_0_10px_rgba(15,98,197,0.2)]">Level 4</span>
            </div>
            <div className="flex gap-6 justify-between mb-2">
              <p className="text-text-muted text-sm">Course Completion</p>
              <p className="text-white text-sm font-bold">75%</p>
            </div>
            <div className="w-full bg-surface-border rounded-full h-3 mb-4 overflow-hidden">
              <div className="bg-primary h-3 rounded-full relative shadow-[0_0_10px_rgba(15,98,197,0.4)] animate-pulse-slow" style={{ width: '75%' }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-lg"></div>
              </div>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Just <span className="text-white font-bold">250 XP</span> more to unlock Advanced Level 5.
            </p>
          </div>
          
          {/* Mini Achievements */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            {['psychology', 'history_edu', 'translate'].map((icon, i) => (
              <div key={i} className={`flex flex-col items-center gap-2 group cursor-pointer ${i === 1 ? 'opacity-50 grayscale' : ''}`}>
                <div className={`size-10 rounded-full bg-surface-darker flex items-center justify-center border transition-all duration-300 group-hover:scale-110 ${i !== 1 ? 'border-primary/50 text-primary shadow-[0_0_10px_rgba(15,98,197,0.2)]' : 'border-white/20 text-white'}`}>
                  <span className="material-symbols-outlined text-[20px]">{icon}</span>
                </div>
                <span className="text-[10px] text-text-muted uppercase font-bold">
                  {['Grammar', 'Essay', 'Vocab'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Performance - Fixed with visible bars */}
        <div className="bg-surface-light rounded-2xl p-6 border border-white/5 flex flex-col hover:border-white/10 transition-all">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-lg font-bold">Weekly Performance</h3>
            <select className="bg-surface-darker text-text-muted text-xs rounded-lg border border-white/10 focus:ring-1 focus:ring-primary py-1.5 px-3 cursor-pointer hover:border-white/20 transition-colors">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          
          {/* Bar Chart - Now with visible bars */}
          <div className="flex items-end justify-between h-40 w-full gap-3 mt-auto px-2">
            {weeklyData.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
                <div className="relative w-full flex justify-center">
                  <div 
                    className={`w-6 md:w-8 rounded-t-lg transition-all duration-500 ${
                      item.active 
                        ? 'bg-gradient-to-t from-primary to-blue-400 shadow-[0_0_20px_rgba(15,98,197,0.4)]' 
                        : 'bg-surface-border group-hover:bg-primary/60'
                    }`}
                    style={{ 
                      height: `${item.value}%`,
                      minHeight: '8px'
                    }}
                  >
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-bg-dark text-[10px] font-bold py-1 px-2 rounded shadow-lg whitespace-nowrap transition-all duration-200 transform group-hover:-translate-y-1">
                      {item.value}%
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] uppercase font-bold transition-colors ${item.active ? 'text-primary' : 'text-text-muted group-hover:text-white'}`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Areas - Enhanced */}
      <div className="flex flex-col gap-4">
        <h2 className="text-white tracking-tight text-2xl font-bold leading-tight">Study Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {studyAreas.map((area, index) => {
            const isBlue = area.color === 'blue';
            return (
              <Link
                key={index}
                to={area.path}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-surface-light border border-white/5 p-8 transition-all duration-300 hover:border-${isBlue ? 'blue-400' : 'primary'}/50 hover:bg-surface-dark hover:shadow-2xl hover:-translate-y-1`}
              >
                {/* Gradient blur */}
                <div className={`absolute -right-16 -top-16 w-64 h-64 ${isBlue ? 'bg-blue-500/10' : 'bg-primary/10'} rounded-full blur-[80px] transition-all duration-500 group-hover:scale-150 group-hover:opacity-75`}></div>
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className={`size-14 rounded-xl bg-surface-darker flex items-center justify-center ${isBlue ? 'text-blue-400' : 'text-primary'} border border-white/5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <span className="material-symbols-outlined text-[32px]">{area.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white/90 transition-colors">{area.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed max-w-sm">{area.description}</p>
                  </div>
                </div>
                <div className={`relative z-10 mt-8 flex items-center ${isBlue ? 'text-blue-400' : 'text-primary'} font-medium text-sm transition-all duration-300 group-hover:translate-x-2`}>
                  Start Session 
                  <span className="material-symbols-outlined ml-2 text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Achievements - Enhanced */}
      <div className="bg-surface-darker rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-bold">Recent Achievements</h3>
          <Link to="/achievements" className="text-xs text-primary font-bold hover:underline hover:text-primary/80 transition-colors">View All</Link>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { name: 'Grammar Guru', time: 'Earned 2 hours ago', icon: 'emoji_events', color: 'primary' },
            { name: 'Vocabulary Master', time: 'Earned Yesterday', icon: 'psychology_alt', color: 'purple' },
            { name: 'Writing Wizard', time: 'Locked', icon: 'lock', color: 'gray', locked: true },
          ].map((badge, i) => (
            <div 
              key={i} 
              className={`flex items-center gap-3 bg-surface-light pr-4 rounded-full border border-white/5 transition-all duration-300 hover:border-white/10 hover:scale-105 cursor-pointer ${badge.locked ? 'opacity-50 hover:opacity-60' : 'hover:shadow-lg'}`}
            >
              <div className={`size-10 rounded-full flex items-center justify-center ${
                badge.color === 'primary' ? 'bg-primary/20 text-primary' : 
                badge.color === 'purple' ? 'bg-purple-500/20 text-purple-400' : 
                'bg-gray-700 text-gray-400'
              }`}>
                <span className="material-symbols-outlined text-[20px]">{badge.icon}</span>
              </div>
              <div className="flex flex-col py-2">
                <span className="text-white text-xs font-bold">{badge.name}</span>
                <span className="text-text-muted text-[10px]">{badge.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
