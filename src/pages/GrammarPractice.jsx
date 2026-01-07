import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const questions = [
  {
    id: 1,
    instruction: 'Select the best word to complete the sentence below.',
    sentence: '"Despite the heavy rain, the construction crew _______ working until the foundation was laid."',
    options: [
      { id: 'A', text: 'continued' },
      { id: 'B', text: 'continuing' },
      { id: 'C', text: 'continues' },
      { id: 'D', text: 'continuation' },
    ],
    correctAnswer: 'A',
    type: 'Sentence Completion'
  },
  {
    id: 2,
    instruction: 'Choose the grammatically correct option.',
    sentence: '"Neither the manager nor the employees _______ aware of the policy change."',
    options: [
      { id: 'A', text: 'was' },
      { id: 'B', text: 'were' },
      { id: 'C', text: 'is' },
      { id: 'D', text: 'are' },
    ],
    correctAnswer: 'B',
    type: 'Subject-Verb Agreement'
  },
  {
    id: 3,
    instruction: 'Select the correct form of the verb.',
    sentence: '"If I _______ known about the meeting, I would have attended."',
    options: [
      { id: 'A', text: 'have' },
      { id: 'B', text: 'had' },
      { id: 'C', text: 'has' },
      { id: 'D', text: 'having' },
    ],
    correctAnswer: 'B',
    type: 'Conditional'
  },
];

export default function GrammarPractice() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(12);
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 29);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const navigate = useNavigate();

  const question = questions[currentQuestionIndex];
  const totalQuestions = 10;
  const questionNumber = currentQuestionIndex + 1;

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      navigate('/results');
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionId) => {
    if (showFeedback) return;
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || showFeedback) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnsweredQuestions(prev => ({ ...prev, [question.id]: selectedAnswer }));

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(answeredQuestions[questions[currentQuestionIndex + 1]?.id] || null);
      setShowFeedback(!!answeredQuestions[questions[currentQuestionIndex + 1]?.id]);
    } else {
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(answeredQuestions[questions[currentQuestionIndex - 1]?.id] || null);
      setShowFeedback(!!answeredQuestions[questions[currentQuestionIndex - 1]?.id]);
    }
  };

  const accuracy = score > 0 ? Math.round((score / Object.keys(answeredQuestions).length) * 100) : 75;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-4 md:px-8 py-4 border-b border-surface-border flex items-center justify-between bg-surface-darker z-10">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/courses" className="flex items-center gap-2 text-text-muted hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span className="hidden sm:inline">Courses</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-success text-[20px]">circle</span>
            <span className="text-white font-bold text-sm md:text-base">Part 5: Grammar</span>
          </div>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-surface-dark px-3 py-1.5 rounded-full border border-white/5">
            <span className="material-symbols-outlined text-orange-500 text-[18px] fill">local_fire_department</span>
            <span className="text-white text-sm font-bold">{streak}</span>
          </div>
          <div className={`flex items-center gap-2 ${timeLeft < 60 ? 'text-error animate-pulse' : 'text-text-muted'}`}>
            <span className="material-symbols-outlined text-[20px]">timer</span>
            <span className="text-sm font-mono tabular-nums">{formatTime(timeLeft)}</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-4">
              <span className="text-white text-lg md:text-xl font-bold">Question {questionNumber}</span>
              <span className="text-text-muted text-sm md:text-base">of {totalQuestions}</span>
            </div>
            <span className="px-2 md:px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/20">
              {question.type}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden mb-6 md:mb-8">
            <div 
              className="h-full bg-orange-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(249,115,22,0.3)]" 
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Question */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Instruction */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
                <p className="text-text-muted text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">Instruction</p>
                <p className="text-white text-base md:text-lg">{question.instruction}</p>
              </div>

              {/* Sentence */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 p-6 md:p-8">
                <p className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed text-center">
                  {question.sentence.split('_______').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`inline-block mx-1 md:mx-2 px-3 md:px-4 py-1 border-b-2 border-dashed text-sm md:text-base ${
                          showFeedback && isCorrect
                            ? 'border-success text-success bg-success/10 rounded'
                            : showFeedback && !isCorrect
                            ? 'border-error text-error bg-error/10 rounded'
                            : selectedAnswer
                            ? 'border-orange-500 text-orange-400'
                            : 'border-orange-500 text-orange-400'
                        }`}>
                          {showFeedback 
                            ? question.options.find(o => o.id === question.correctAnswer)?.text
                            : selectedAnswer 
                            ? question.options.find(o => o.id === selectedAnswer)?.text 
                            : '?'}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {question.options.map((option) => {
                  let optionStyle = 'border-white/10 bg-surface-dark';
                  if (showFeedback) {
                    if (option.id === question.correctAnswer) {
                      optionStyle = 'border-success bg-success/10';
                    } else if (option.id === selectedAnswer && !isCorrect) {
                      optionStyle = 'border-error bg-error/10';
                    }
                  } else if (selectedAnswer === option.id) {
                    optionStyle = 'border-orange-500 bg-surface-darker';
                  }

                  return (
                    <label
                      key={option.id}
                      className={`group relative flex cursor-pointer rounded-xl md:rounded-2xl border p-4 md:p-5 transition-all ${!showFeedback ? 'hover:border-orange-500/50 hover:bg-surface-darker' : ''} ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name="answer"
                        className="sr-only"
                        checked={selectedAnswer === option.id}
                        onChange={() => handleAnswerSelect(option.id)}
                        disabled={showFeedback}
                      />
                      <div className="flex gap-3 md:gap-4 items-center w-full">
                        <span className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg text-base md:text-lg font-bold transition-colors ${
                          showFeedback && option.id === question.correctAnswer
                            ? 'bg-success/20 text-success'
                            : showFeedback && option.id === selectedAnswer && !isCorrect
                            ? 'bg-error/20 text-error'
                            : selectedAnswer === option.id 
                            ? 'bg-orange-500/20 text-orange-400' 
                            : 'bg-white/5 text-text-muted group-hover:text-white'
                        }`}>
                          {option.id}
                        </span>
                        <span className="text-sm md:text-lg font-medium text-white">{option.text}</span>
                      </div>
                      {showFeedback && option.id === question.correctAnswer && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-success">check_circle</span>
                      )}
                      {showFeedback && option.id === selectedAnswer && !isCorrect && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-error">cancel</span>
                      )}
                      {!showFeedback && selectedAnswer === option.id && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-orange-500">check_circle</span>
                      )}
                    </label>
                  );
                })}
              </div>

              {/* Feedback Message */}
              {showFeedback && (
                <div className={`p-4 rounded-xl border ${isCorrect ? 'bg-success/10 border-success/30' : 'bg-error/10 border-error/30'}`}>
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined ${isCorrect ? 'text-success' : 'text-error'}`}>
                      {isCorrect ? 'check_circle' : 'error'}
                    </span>
                    <span className={`font-bold ${isCorrect ? 'text-success' : 'text-error'}`}>
                      {isCorrect ? 'Correct! +15 XP' : 'Incorrect'}
                    </span>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4">
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 md:px-5 py-2.5 rounded-xl border border-white/10 bg-transparent text-text-muted hover:text-white hover:bg-white/5 transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Previous
                </button>
                
                {!showFeedback ? (
                  <button 
                    onClick={handleSubmit}
                    className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!selectedAnswer}
                  >
                    <span>Check Answer</span>
                    <span className="material-symbols-outlined text-[20px]">check</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleNext}
                    className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transition-all"
                  >
                    <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                )}
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-4">
              {/* Session Performance */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
                <h3 className="text-white font-bold mb-4">Session Performance</h3>
                
                {/* Circular Progress */}
                <div className="flex justify-center mb-6">
                  <div className="relative w-24 h-24 md:w-28 md:h-28">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="10" fill="none" className="text-surface-light" />
                      <circle 
                        cx="50%" cy="50%" r="42%" 
                        stroke="currentColor" strokeWidth="10" fill="none" 
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={2 * Math.PI * 48 * (1 - accuracy / 100)}
                        className="text-success transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl md:text-2xl font-black text-white">{accuracy}%</span>
                      <span className="text-text-muted text-[10px] uppercase">Accuracy</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-text-muted text-xs mb-1">Current Streak</p>
                    <p className="text-orange-400 font-bold text-lg">{streak}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-xs mb-1">XP Earned</p>
                    <p className="text-success font-bold text-lg">+{score * 15}</p>
                  </div>
                </div>
              </div>

              {/* Problem Areas */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
                <h4 className="text-white font-bold mb-3">Problem Areas</h4>
                <div className="flex items-center gap-2 text-error">
                  <span className="material-symbols-outlined text-[18px]">warning</span>
                  <span className="text-sm">Prepositions</span>
                  <span className="ml-auto text-xs">Low Accuracy</span>
                </div>
              </div>

              {/* Quick Tip */}
              <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                  <h4 className="text-white font-bold">Quick Tip</h4>
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-4">
                  Look for time markers like "until" or "since" to determine the correct verb tense.
                </p>
                <button className="w-full py-2 rounded-lg border border-white/10 text-text-muted hover:text-white hover:bg-white/5 transition-colors text-sm">
                  Review Grammar Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
