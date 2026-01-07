import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

export default function AssessmentResults() {
  const { quizResults } = useQuiz();

  // Fallback to mock data if no results (e.g., direct navigation)
  const results = quizResults || {
    quizType: 'Quiz',
    score: 0,
    passed: false,
    xp: 0,
    time: '0m 0s',
    accuracy: '0/0',
    completedAt: new Date().toLocaleString(),
    totalQuestions: 0,
    correctAnswers: 0,
    questions: []
  };

  const correctCount = results.questions?.filter(q => q.isCorrect).length || 0;
  const incorrectCount = results.questions?.filter(q => !q.isCorrect).length || 0;

  return (
    <div className="h-full overflow-y-auto bg-bg-dark">
      {/* Content */}
      <main className="max-w-[1000px] mx-auto p-4 md:p-6 lg:p-8 pb-20">
        {/* Breadcrumb */}
        <nav className="text-text-muted text-sm mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-white flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">home</span>
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link to="/courses" className="hover:text-white">Courses</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-white">Results</span>
        </nav>

        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${results.passed ? 'bg-success/20' : 'bg-error/20'}`}>
                <span className={`material-symbols-outlined text-[28px] ${results.passed ? 'text-success' : 'text-error'}`}>
                  {results.passed ? 'celebration' : 'sentiment_dissatisfied'}
                </span>
              </div>
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-black">
                  {results.passed ? 'Well Done!' : 'Keep Practicing!'}
                </h1>
                <p className="text-text-muted text-sm">{results.quizType} Complete</p>
              </div>
            </div>
            {results.completedAt && (
              <p className="text-text-muted flex items-center gap-2 text-sm mt-2">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                Completed on {results.completedAt}
              </p>
            )}
          </div>
          <div className="flex gap-2 md:gap-3">
            <button className="px-3 md:px-4 py-2 rounded-xl border border-white/10 text-text-muted hover:text-white hover:bg-white/5 transition-colors text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">share</span>
              <span className="hidden sm:inline">Share</span>
            </button>
            <Link to="/courses" className="px-4 md:px-6 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm transition-all">
              Continue
            </Link>
          </div>
        </div>

        {/* Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Score */}
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8 flex flex-col items-center">
            <p className="text-text-muted text-sm mb-4">{results.quizType} Score</p>
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
              <svg className="w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="none" className="text-surface-light" />
                <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10" fill="none" 
                  strokeDasharray={2 * Math.PI * 72} strokeDashoffset={2 * Math.PI * 72 * (1 - results.score / 100)}
                  className={`${results.passed ? 'text-success' : 'text-error'} transition-all duration-1000`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-black text-white">{results.score}%</span>
                <span className={`text-sm font-bold ${results.passed ? 'text-success' : 'text-error'}`}>
                  {results.passed ? 'PASSED' : 'NEEDS WORK'}
                </span>
              </div>
            </div>
            <p className="text-text-muted text-sm text-center">
              You answered <span className="text-success font-bold">{results.correctAnswers || correctCount}</span> out of <span className="text-white font-bold">{results.totalQuestions}</span> questions correctly.
            </p>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              <div className="bg-surface-dark rounded-xl p-3 md:p-4 border border-white/5 text-center">
                <p className="text-text-muted text-[10px] md:text-xs mb-1">XP Gained</p>
                <p className="text-success font-bold text-base md:text-lg">+{results.xp} XP</p>
              </div>
              <div className="bg-surface-dark rounded-xl p-3 md:p-4 border border-white/5 text-center">
                <p className="text-text-muted text-[10px] md:text-xs mb-1">Time</p>
                <p className="text-white font-bold text-base md:text-lg">{results.time}</p>
              </div>
              <div className="bg-surface-dark rounded-xl p-3 md:p-4 border border-white/5 text-center">
                <p className="text-text-muted text-[10px] md:text-xs mb-1">Accuracy</p>
                <p className="text-white font-bold text-base md:text-lg">{results.accuracy}</p>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
              <h3 className="text-white font-bold text-sm md:text-base mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-success text-[20px]">check_circle</span>
                    <span className="text-text-muted text-sm">Correct Answers</span>
                  </div>
                  <span className="text-success font-bold">{correctCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-error text-[20px]">cancel</span>
                    <span className="text-text-muted text-sm">Incorrect Answers</span>
                  </div>
                  <span className="text-error font-bold">{incorrectCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">quiz</span>
                    <span className="text-text-muted text-sm">Total Questions</span>
                  </div>
                  <span className="text-white font-bold">{results.totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review */}
        {results.questions && results.questions.length > 0 && (
          <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 md:p-6 border-b border-white/5">
              <h3 className="text-white text-base md:text-lg font-bold">Question Review</h3>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded bg-success/20 text-success">{correctCount} Correct</span>
                <span className="px-2 py-1 rounded bg-error/20 text-error">{incorrectCount} Incorrect</span>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {results.questions.map((q, index) => (
                <div key={q.id || index} className="p-4 md:p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${q.isCorrect ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                      <span className="material-symbols-outlined text-[16px] md:text-[18px]">{q.isCorrect ? 'check' : 'close'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-text-muted text-xs">Q{index + 1}</span>
                        <span className="text-text-muted text-xs">•</span>
                        <span className="text-text-muted text-xs">{q.type}</span>
                      </div>
                      <p className="text-white font-medium mb-3 text-sm md:text-base">{q.question}</p>
                      <div className="flex flex-wrap gap-4">
                        <div>
                          <p className="text-text-muted text-xs mb-1">Your Answer</p>
                          <p className={`font-medium text-sm ${q.isCorrect ? 'text-success' : 'text-error'}`}>
                            {q.isCorrect ? '✓' : '✗'} {q.yourAnswer}
                          </p>
                        </div>
                        {!q.isCorrect && (
                          <div>
                            <p className="text-text-muted text-xs mb-1">Correct Answer</p>
                            <p className="text-success font-medium text-sm">✓ {q.correctAnswer}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-bold hidden sm:block ${q.isCorrect ? 'text-success' : 'text-error'}`}>
                      {q.isCorrect ? 'CORRECT' : 'INCORRECT'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {(!results.questions || results.questions.length === 0) && (
          <div className="bg-surface-dark rounded-2xl border border-white/5 p-8 text-center mb-6">
            <span className="material-symbols-outlined text-text-muted text-[48px] mb-4">quiz</span>
            <p className="text-white font-bold mb-2">No quiz data available</p>
            <p className="text-text-muted text-sm">Complete a quiz to see your detailed results here.</p>
            <Link to="/courses" className="inline-block mt-4 px-6 py-2 rounded-xl bg-primary text-white font-bold text-sm">
              Take a Quiz
            </Link>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="bg-surface-darker rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-sm md:text-base">Ready for the next challenge?</p>
            <p className="text-text-muted text-xs md:text-sm">Continue to the next section or retake this quiz</p>
          </div>
          <div className="flex gap-2 md:gap-3 w-full sm:w-auto">
            <Link to="/courses" className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium text-sm text-center">
              Retake Quiz
            </Link>
            <Link to="/courses" className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold transition-all text-sm flex items-center justify-center gap-2">
              Next Section
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
