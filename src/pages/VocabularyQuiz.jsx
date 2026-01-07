import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const questions = [
  {
    id: 1,
    word: 'Meticulous',
    context: 'The scientist was meticulous in recording every detail of the experiment.',
    options: [
      { id: 'A', text: 'Careless and hasty' },
      { id: 'B', text: 'Extremely careful and precise' },
      { id: 'C', text: 'Loud and boisterous' },
      { id: 'D', text: 'Uncertain and doubtful' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 2,
    word: 'Ephemeral',
    context: 'The beauty of cherry blossoms is ephemeral, lasting only a few weeks each spring.',
    options: [
      { id: 'A', text: 'Lasting for a very short time' },
      { id: 'B', text: 'Extremely expensive' },
      { id: 'C', text: 'Brilliantly colored' },
      { id: 'D', text: 'Artificially created' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 3,
    word: 'Ubiquitous',
    context: 'Smartphones have become ubiquitous, found in the hands of people everywhere.',
    options: [
      { id: 'A', text: 'Rare and expensive' },
      { id: 'B', text: 'Difficult to use' },
      { id: 'C', text: 'Present everywhere' },
      { id: 'D', text: 'Highly technical' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 4,
    word: 'Pragmatic',
    context: 'She took a pragmatic approach, focusing on solutions that would actually work.',
    options: [
      { id: 'A', text: 'Overly idealistic' },
      { id: 'B', text: 'Dealing with things sensibly and realistically' },
      { id: 'C', text: 'Extremely pessimistic' },
      { id: 'D', text: 'Randomly chosen' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 5,
    word: 'Ambiguous',
    context: 'The instructions were ambiguous, leaving everyone confused about what to do.',
    options: [
      { id: 'A', text: 'Clear and straightforward' },
      { id: 'B', text: 'Extremely detailed' },
      { id: 'C', text: 'Open to more than one interpretation' },
      { id: 'D', text: 'Written in a foreign language' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 6,
    word: 'Resilient',
    context: 'The community proved resilient, quickly rebuilding after the storm.',
    options: [
      { id: 'A', text: 'Easily broken or damaged' },
      { id: 'B', text: 'Able to recover quickly from difficulties' },
      { id: 'C', text: 'Resistant to change' },
      { id: 'D', text: 'Living in rural areas' },
    ],
    correctAnswer: 'B',
  },
  {
    id: 7,
    word: 'Eloquent',
    context: 'The speaker was eloquent, captivating the audience with her powerful words.',
    options: [
      { id: 'A', text: 'Unable to speak clearly' },
      { id: 'B', text: 'Speaking very quietly' },
      { id: 'C', text: 'Fluent and persuasive in speaking' },
      { id: 'D', text: 'Speaking in multiple languages' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 8,
    word: 'Profound',
    context: 'The book had a profound impact on how I viewed the world.',
    options: [
      { id: 'A', text: 'Very deep or intense' },
      { id: 'B', text: 'Slightly noticeable' },
      { id: 'C', text: 'Professionally written' },
      { id: 'D', text: 'Quickly forgotten' },
    ],
    correctAnswer: 'A',
  },
  {
    id: 9,
    word: 'Tenacious',
    context: 'Despite many rejections, the tenacious inventor never gave up on her dream.',
    options: [
      { id: 'A', text: 'Giving up easily' },
      { id: 'B', text: 'Skeptical and doubtful' },
      { id: 'C', text: 'Persistent and determined' },
      { id: 'D', text: 'Calm and relaxed' },
    ],
    correctAnswer: 'C',
  },
  {
    id: 10,
    word: 'Candid',
    context: 'He was candid about his mistakes, openly admitting what went wrong.',
    options: [
      { id: 'A', text: 'Secretive and guarded' },
      { id: 'B', text: 'Truthful and straightforward' },
      { id: 'C', text: 'Overly critical' },
      { id: 'D', text: 'Photographed informally' },
    ],
    correctAnswer: 'B',
  },
];

export default function VocabularyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(3);
  const [timeLeft, setTimeLeft] = useState(8 * 60 + 30);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [questionResults, setQuestionResults] = useState([]);
  const startTime = useRef(Date.now());
  const navigate = useNavigate();
  const { saveResults } = useQuiz();

  const question = questions[currentQuestion];
  const totalQuestions = questions.length;

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
    if (showFeedback) return; // Don't allow changing after submitting
    setSelectedAnswer(optionId);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || showFeedback) return;

    const correct = selectedAnswer === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setAnsweredQuestions(prev => ({ ...prev, [question.id]: selectedAnswer }));
    
    // Track this question's result
    setQuestionResults(prev => [...prev.filter(r => r.id !== question.id), {
      id: question.id,
      type: 'Vocabulary',
      question: `What does "${question.word}" mean?`,
      yourAnswer: question.options.find(o => o.id === selectedAnswer)?.text,
      correctAnswer: question.options.find(o => o.id === question.correctAnswer)?.text,
      isCorrect: correct
    }]);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answeredQuestions[questions[currentQuestion + 1]?.id] || null);
      setShowFeedback(false);
    } else {
      // Calculate final results and save
      const elapsedSeconds = Math.floor((Date.now() - startTime.current) / 1000);
      const mins = Math.floor(elapsedSeconds / 60);
      const secs = elapsedSeconds % 60;
      const finalScore = score + (isCorrect ? 0 : 0); // score already includes this question
      
      saveResults({
        quizType: 'Vocabulary Quiz',
        score: Math.round((finalScore / totalQuestions) * 100),
        passed: finalScore >= totalQuestions * 0.6,
        xp: finalScore * 10,
        time: `${mins}m ${secs}s`,
        accuracy: `${finalScore}/${totalQuestions}`,
        totalQuestions,
        correctAnswers: finalScore,
        questions: questionResults
      });
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answeredQuestions[questions[currentQuestion - 1]?.id] || null);
      setShowFeedback(!!answeredQuestions[questions[currentQuestion - 1]?.id]);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 px-4 md:px-8 py-4 md:py-5 border-b border-surface-border flex flex-col gap-4 bg-bg-dark z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-muted text-sm md:text-base">
            <Link to="/courses" className="hover:text-white transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span className="hidden sm:inline">Vocabulary</span>
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-white font-medium">Word Meanings</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 bg-surface-dark px-3 py-1.5 rounded-full border border-white/5">
              <span className="material-symbols-outlined text-orange-500 text-[20px] fill">local_fire_department</span>
              <span className="text-white text-sm font-bold">{streak} Streak</span>
            </div>
            <div className={`flex items-center gap-2 ${timeLeft < 60 ? 'text-error animate-pulse' : 'text-text-muted'}`}>
              <span className="material-symbols-outlined text-[20px]">timer</span>
              <span className="text-sm font-mono tabular-nums">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <span className="text-white text-sm font-medium">Question {currentQuestion + 1} of {totalQuestions}</span>
            <span className="text-text-muted text-xs">{Math.round(((currentQuestion + 1) / totalQuestions) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-teal-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(20,184,166,0.3)]" 
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-full max-w-[1400px] mx-auto">
          {/* Main Question Area */}
          <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
            {/* Word Card */}
            <div className="bg-gradient-to-br from-teal-500/10 to-primary/10 rounded-2xl p-6 md:p-8 border border-teal-500/20">
              <p className="text-teal-400 text-sm font-medium uppercase tracking-wider mb-2">Define this word</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">{question.word}</h2>
              <div className="flex items-start gap-2 bg-surface-dark/50 rounded-xl p-4 border border-white/5">
                <span className="material-symbols-outlined text-text-muted text-[20px] mt-0.5">format_quote</span>
                <p className="text-text-muted italic leading-relaxed text-sm md:text-base">{question.context}</p>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {question.options.map((option) => {
                let optionStyle = 'border-white/10 bg-surface-dark';
                if (showFeedback) {
                  if (option.id === question.correctAnswer) {
                    optionStyle = 'border-success bg-success/10';
                  } else if (option.id === selectedAnswer && !isCorrect) {
                    optionStyle = 'border-error bg-error/10';
                  }
                } else if (selectedAnswer === option.id) {
                  optionStyle = 'border-teal-500 bg-surface-darker';
                }

                return (
                  <label
                    key={option.id}
                    className={`group relative flex cursor-pointer rounded-xl md:rounded-2xl border p-4 md:p-5 transition-all ${!showFeedback ? 'hover:border-teal-500/50 hover:bg-surface-darker hover:shadow-lg' : ''} ${optionStyle}`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      className="sr-only"
                      checked={selectedAnswer === option.id}
                      onChange={() => handleAnswerSelect(option.id)}
                      disabled={showFeedback}
                    />
                    <div className="flex gap-3 md:gap-4 items-center w-full pr-8">
                      <span className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg text-base md:text-lg font-bold transition-colors ${
                        showFeedback && option.id === question.correctAnswer
                          ? 'bg-success/20 text-success'
                          : showFeedback && option.id === selectedAnswer && !isCorrect
                          ? 'bg-error/20 text-error'
                          : selectedAnswer === option.id 
                          ? 'bg-teal-500/20 text-teal-400' 
                          : 'bg-white/5 text-text-muted group-hover:text-white'
                      }`}>
                        {option.id}
                      </span>
                      <span className="text-sm md:text-base font-medium text-white flex-1">{option.text}</span>
                    </div>
                    {showFeedback && option.id === question.correctAnswer && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-success text-[20px]">check_circle</span>
                    )}
                    {showFeedback && option.id === selectedAnswer && !isCorrect && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-error text-[20px]">cancel</span>
                    )}
                    {!showFeedback && selectedAnswer === option.id && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 rounded-full bg-teal-500 flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[14px] md:text-[16px] font-bold">check</span>
                      </div>
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
                    {isCorrect ? 'Correct! +10 XP' : 'Incorrect'}
                  </span>
                </div>
                {!isCorrect && (
                  <p className="text-text-muted text-sm mt-2">
                    The correct answer is <strong className="text-success">{question.options.find(o => o.id === question.correctAnswer)?.text}</strong>
                  </p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-auto pt-4 md:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/5">
              <button 
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-5 py-2.5 rounded-xl border border-white/10 bg-transparent text-text-muted hover:text-white hover:bg-white/5 transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Previous
              </button>
              
              {!showFeedback ? (
                <button 
                  onClick={handleSubmit}
                  className="group flex items-center justify-center gap-2 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedAnswer}
                >
                  <span>Check Answer</span>
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </button>
              ) : (
                <button 
                  onClick={handleNext}
                  className="group flex items-center justify-center gap-2 px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25 transition-all"
                >
                  <span>{currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                  <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              )}
            </div>
          </div>

          {/* Side Panel: Score */}
          <div className="flex flex-col gap-4">
            {/* Score Card */}
            <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
              <h3 className="text-white font-bold mb-4">Session Performance</h3>
              
              {/* Circular Score */}
              <div className="flex justify-center mb-6">
                <div className="relative w-28 h-28 md:w-32 md:h-32">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="12" fill="none" className="text-surface-light" />
                    <circle 
                      cx="50%" cy="50%" r="45%" 
                      stroke="currentColor" strokeWidth="12" fill="none" 
                      strokeDasharray={2 * Math.PI * 56}
                      strokeDashoffset={2 * Math.PI * 56 * (1 - score / totalQuestions)}
                      className="text-teal-500 transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl md:text-3xl font-black text-white">{score}</span>
                    <span className="text-text-muted text-xs">of {totalQuestions}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-sm">Accuracy</span>
                  <span className="text-white font-bold">{currentQuestion > 0 ? Math.round((score / (currentQuestion + (showFeedback ? 1 : 0))) * 100) : 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-sm">Current Streak</span>
                  <span className="text-orange-400 font-bold">{streak} 🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-sm">XP Earned</span>
                  <span className="text-teal-400 font-bold">+{score * 10}</span>
                </div>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 md:p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
                <h4 className="text-white font-bold">Quick Tip</h4>
              </div>
              <p className="text-text-muted text-sm leading-relaxed">
                Look at the context sentence to understand how the word is used. The surrounding words often give clues about the meaning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
