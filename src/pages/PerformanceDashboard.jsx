import { Link } from 'react-router-dom';

// 5 Exam Parts with scores
const skillsData = [
  { name: 'Writing', score: 85, grade: 'A', color: '#22c55e' },
  { name: 'Comprehension\nPassages', score: 70, grade: 'B+', color: '#22c55e' },
  { name: 'Comprehension\nCloze', score: 90, grade: 'A+', color: '#22c55e' },
  { name: 'Vocabulary', score: 60, grade: 'B-', color: '#f59e0b' },
  { name: 'Grammar', score: 75, grade: 'B', color: '#22c55e' },
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

// Pentagram (5-sided) Radar Chart Component
function SkillsPentagram({ skills, size = 280 }) {
  const center = size / 2;
  const radius = size * 0.38;
  const levels = 5; // Grid levels
  
  // Calculate pentagon points for a given radius
  const getPoint = (index, r) => {
    const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2; // Start from top
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate grid pentagons
  const gridPolygons = [];
  for (let level = 1; level <= levels; level++) {
    const r = (radius * level) / levels;
    const points = Array.from({ length: 5 }, (_, i) => getPoint(i, r));
    gridPolygons.push(points.map(p => `${p.x},${p.y}`).join(' '));
  }

  // Generate skill polygon based on scores
  const skillPoints = skills.map((skill, i) => {
    const r = (radius * skill.score) / 100;
    return getPoint(i, r);
  });
  const skillPolygon = skillPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Label positions (slightly outside the pentagon)
  const labelRadius = radius + 35;
  const labelPositions = skills.map((skill, i) => ({
    ...getPoint(i, labelRadius),
    skill,
  }));

  return (
    <div className="relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid lines from center to vertices */}
        {Array.from({ length: 5 }, (_, i) => {
          const point = getPoint(i, radius);
          return (
            <line
              key={`line-${i}`}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}

        {/* Grid pentagons */}
        {gridPolygons.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Skill area - filled polygon */}
        <polygon
          points={skillPolygon}
          fill="rgba(34, 197, 94, 0.2)"
          stroke="#22c55e"
          strokeWidth="2"
        />

        {/* Skill points */}
        {skillPoints.map((point, i) => (
          <circle
            key={`point-${i}`}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#22c55e"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Labels positioned around the pentagon */}
      {labelPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute text-center"
          style={{
            left: pos.x,
            top: pos.y,
            transform: 'translate(-50%, -50%)',
            width: '80px',
          }}
        >
          <div className="text-white text-xs font-medium whitespace-pre-line leading-tight">
            {pos.skill.name}
          </div>
          <div className="text-success text-lg font-bold">{pos.skill.score}%</div>
        </div>
      ))}
    </div>
  );
}

export default function PerformanceDashboard() {
  // Find weakest skill
  const weakestSkill = skillsData.reduce((min, skill) => 
    skill.score < min.score ? skill : min
  );

  return (
    <div className="max-w-[1400px] mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
              Skills Proficiency
            </h1>
            <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              14 Day Streak
            </span>
          </div>
          <p className="text-text-muted">Your personalized English skills pentagram and growth metrics.</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skills Pentagram Card */}
        <div className="lg:col-span-2 bg-surface-dark rounded-2xl border border-white/5 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white text-lg font-bold">Skills Pentagram</h3>
              <p className="text-text-muted text-sm">Balanced view of your core competencies</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">
              Updated Today
            </span>
          </div>
          
          {/* Pentagram Chart */}
          <div className="flex justify-center py-6">
            <SkillsPentagram skills={skillsData} size={320} />
          </div>

          {/* Grade Cards */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {skillsData.map((skill) => (
              <div 
                key={skill.name} 
                className="bg-surface-light rounded-xl p-3 text-center border border-white/5"
              >
                <div 
                  className="w-full h-1 rounded-full mb-2"
                  style={{ backgroundColor: skill.color }}
                ></div>
                <p className="text-text-muted text-[10px] uppercase tracking-wider mb-1">
                  {skill.name.split('\n')[0]}
                </p>
                <p className="text-white text-xl font-bold">{skill.grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6">
            <h3 className="text-white font-bold mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-2xl">verified</span>
                </div>
                <div>
                  <p className="text-text-muted text-sm">Current Level</p>
                  <p className="text-white text-xl font-bold">B2 Upper</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-success text-2xl">star</span>
                </div>
                <div>
                  <p className="text-text-muted text-sm">Total XP</p>
                  <p className="text-white text-xl font-bold">12,450</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-orange-400 text-2xl">timer</span>
                </div>
                <div>
                  <p className="text-text-muted text-sm">Study Time</p>
                  <p className="text-white text-xl font-bold">42.5h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-bold">Leaderboard</h3>
              <Link to="/leaderboard" className="text-xs text-primary hover:underline">View All</Link>
            </div>
            <div className="space-y-2">
              {leaderboard.slice(0, 4).map((user) => (
                <div key={user.rank} className={`flex items-center gap-3 p-2 rounded-xl ${user.isYou ? 'bg-primary/10 border border-primary/20' : ''}`}>
                  <span className={`w-6 text-center font-bold ${user.rank <= 3 ? 'text-warning' : 'text-text-muted'}`}>{user.rank}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.isYou ? 'bg-primary text-white' : 'bg-surface-light text-text-muted'}`}>
                    {user.avatar}
                  </div>
                  <span className={`flex-1 font-medium text-sm ${user.isYou ? 'text-primary' : 'text-white'}`}>{user.name}</span>
                  <span className="text-text-muted text-xs">{user.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Focus Area - Weakest Skill */}
      <div className="bg-surface-dark rounded-2xl border border-error/20 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-error/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-error text-2xl">warning</span>
          </div>
          <div>
            <h4 className="text-white font-bold">Expand your {weakestSkill.name.split('\n')[0]}</h4>
            <p className="text-text-muted text-sm">Your {weakestSkill.name.split('\n')[0]} score is currently your weakest axis. Practice to balance your pentagram.</p>
          </div>
        </div>
        <Link 
          to={weakestSkill.name.includes('Vocab') ? '/vocabulary' : '/grammar'} 
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          Level Up {weakestSkill.name.split('\n')[0]}
        </Link>
      </div>

      {/* Weekly Activity */}
      <div className="bg-surface-dark rounded-2xl border border-white/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white text-lg font-bold">Weekly Activity</h3>
          <div className="flex bg-surface-light rounded-lg p-1">
            {['Week', 'Month', 'Year'].map((period, i) => (
              <button key={period} className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${i === 0 ? 'bg-primary text-white' : 'text-text-muted hover:text-white'}`}>
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-end justify-between h-32 gap-2">
          {weeklyData.map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2 w-full">
              <div 
                className={`w-full max-w-[40px] ${item.active ? 'bg-success' : 'bg-surface-light hover:bg-primary/50'} transition-all rounded-t-md`}
                style={{ height: `${item.value}%` }}
              ></div>
              <span className={`text-[10px] uppercase font-bold ${item.active ? 'text-success' : 'text-text-muted'}`}>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
