import { Link } from 'react-router-dom';

const courses = [
  {
    part: 1,
    title: 'Writing',
    description: 'Practice essay structure and creative writing',
    items: '1 story',
    icon: 'edit_note',
    color: 'primary',
    path: '/writing',
    progress: 0,
  },
  {
    part: 2,
    title: 'Comprehension (MCQ)',
    description: 'Reading passages with multiple choice questions',
    items: '2 passages, 15 items',
    icon: 'menu_book',
    color: 'blue',
    path: '/comprehension',
    progress: 40,
  },
  {
    part: 3,
    title: 'Comprehension Cloze',
    description: 'Fill in the blanks based on passage context',
    items: '2 passages, 15 items',
    icon: 'text_fields',
    color: 'purple',
    path: '/comprehension-cloze',
    progress: 20,
  },
  {
    part: 4,
    title: 'Vocabulary',
    description: 'Word meanings, synonyms, and usage',
    items: '10 items',
    icon: 'spellcheck',
    color: 'teal',
    path: '/vocabulary',
    progress: 60,
  },
  {
    part: 5,
    title: 'Grammar',
    description: 'Sentence structure and grammar rules',
    items: '10 items',
    icon: 'check_circle',
    color: 'orange',
    path: '/grammar',
    progress: 80,
  },
];

const colorClasses = {
  primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/30', progressBg: 'bg-primary' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', progressBg: 'bg-blue-500' },
  purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', progressBg: 'bg-purple-500' },
  teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30', progressBg: 'bg-teal-500' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', progressBg: 'bg-orange-500' },
};

export default function CourseSelection() {
  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8 pb-20">
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
          Choose Your Course
        </h1>
        <p className="text-text-muted text-base">
          Select a section to practice. Complete all 5 parts to master English!
        </p>
      </header>

      {/* Stats Summary */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-3 bg-surface-light px-4 py-2 rounded-xl border border-white/5">
          <span className="material-symbols-outlined text-primary">timer</span>
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold">~45 mins</span>
            <span className="text-text-muted text-xs">Total time</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-surface-light px-4 py-2 rounded-xl border border-white/5">
          <span className="material-symbols-outlined text-success">check_circle</span>
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold">51 items</span>
            <span className="text-text-muted text-xs">Total questions</span>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-surface-light px-4 py-2 rounded-xl border border-white/5">
          <span className="material-symbols-outlined text-orange-400">local_fire_department</span>
          <div className="flex flex-col">
            <span className="text-white text-sm font-bold">5 days</span>
            <span className="text-text-muted text-xs">Current streak</span>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const colors = colorClasses[course.color];
          return (
            <Link
              key={course.part}
              to={course.path}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface-light border border-white/5 p-6 transition-all hover:border-white/20 hover:bg-surface-dark hover:shadow-xl"
            >
              {/* Part Badge */}
              <div className={`absolute top-4 right-4 px-2 py-1 rounded-md ${colors.bg} ${colors.text} text-xs font-bold`}>
                Part {course.part}
              </div>

              {/* Icon */}
              <div className={`size-14 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <span className="material-symbols-outlined text-[32px]">{course.icon}</span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed mb-4">{course.description}</p>
              
              {/* Items count */}
              <div className="flex items-center gap-2 text-text-muted text-xs mb-4">
                <span className="material-symbols-outlined text-[16px]">quiz</span>
                {course.items}
              </div>

              {/* Progress Bar */}
              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-muted text-xs">Progress</span>
                  <span className="text-white text-xs font-bold">{course.progress}%</span>
                </div>
                <div className="w-full bg-surface-border rounded-full h-2">
                  <div 
                    className={`${colors.progressBg} h-2 rounded-full transition-all`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Start button */}
              <div className={`mt-6 flex items-center ${colors.text} font-medium text-sm group-hover:translate-x-2 transition-transform`}>
                {course.progress > 0 ? 'Continue' : 'Start'} <span className="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
