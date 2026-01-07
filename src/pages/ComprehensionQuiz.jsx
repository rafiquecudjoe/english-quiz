import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const passage = {
  title: 'The Reluctant Traveler',
  paragraphs: [
    {
      id: 1,
      text: "The old station clock ticked rhythmically, a metronome counting down the seconds until departure. Elias adjusted his coat, the fabric stiff and unfamiliar against his neck. He had spent forty years in this valley, watching the seasons paint the hills in shifting hues of emerald and gold, never once feeling the urge to see what lay beyond the ridge."
    },
    {
      id: 2,
      text: "But the letter had changed everything. It sat heavy in his breast pocket, a paper anchor dragging him toward a future he hadn't chosen. His sister's handwriting was frantic, looping and jagged, a stark contrast to the steady, predictable life he had cultivated."
    },
    {
      id: 3,
      text: "The wind howled outside, rattling the windowpanes. Sarah stared at the heavy oak door, her hand hovering over the cold brass knob. She knew she had to leave, but her feet felt rooted to the floorboards. Every instinct screamed at her to stay in the warmth of the cottage, yet the letter in her pocket burned with urgency.",
      highlighted: true
    },
    {
      id: 4,
      text: "Departure was not merely an act of leaving; it was an act of severing. To step onto that train was to admit that the valley was no longer enough, or perhaps, that he was no longer enough for the valley."
    },
  ]
};

const questions = [
  {
    number: 14,
    text: 'In Paragraph 3, what does the word "rooted" imply about the character\'s feelings towards leaving?',
    highlightedWord: 'rooted',
    options: [
      { id: 'A', text: 'She is physically unable to move due to fear.' },
      { id: 'B', text: 'She feels a strong, almost involuntary connection to staying.' },
      { id: 'C', text: 'She has decided to plant a garden instead of leaving.' },
      { id: 'D', text: 'She is angry and refusing to open the heavy oak door.' },
    ],
    correctAnswer: 'B'
  },
  {
    number: 15,
    text: 'What is the primary purpose of the "letter" mentioned in Paragraph 2?',
    highlightedWord: 'letter',
    options: [
      { id: 'A', text: 'To provide entertainment during the train journey.' },
      { id: 'B', text: 'To serve as the catalyst that forces the protagonist to act.' },
      { id: 'C', text: 'To describe the beautiful scenery of the valley.' },
      { id: 'D', text: 'To explain the history of the train station.' },
    ],
    correctAnswer: 'B'
  }
];

export default function ComprehensionQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 2);
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const navigate = useNavigate();

  const question = questions[currentQuestionIndex];
  const totalQuestions = 20;
  const progressNumber = question.number;

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

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      // Save current answer
      if (selectedAnswer) {
        setAnswers(prev => ({ ...prev, [question.number]: selectedAnswer }));
      }
      setCurrentQuestionIndex(prev => prev - 1);
      // Load previous answer
      const prevQuestion = questions[currentQuestionIndex - 1];
      setSelectedAnswer(answers[prevQuestion.number] || null);
    }
  };

  const handleSkip = () => {
    // Mark as skipped
    if (!skippedQuestions.includes(question.number)) {
      setSkippedQuestions(prev => [...prev, question.number]);
    }
    handleNext(true);
  };

  const handleNext = (isSkip = false) => {
    // Save current answer
    if (selectedAnswer && !isSkip) {
      setAnswers(prev => ({ ...prev, [question.number]: selectedAnswer }));
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // Load next answer if exists
      const nextQuestion = questions[currentQuestionIndex + 1];
      setSelectedAnswer(answers[nextQuestion.number] || null);
    } else {
      // Quiz complete
      navigate('/results');
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
              <span className="hidden sm:inline">Comprehension</span>
            </Link>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-white font-medium">Vocabulary in Context</span>
          </div>
          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden sm:flex items-center gap-2 bg-surface-dark px-3 py-1.5 rounded-full border border-white/5">
              <span className="material-symbols-outlined text-orange-500 text-[20px] fill">local_fire_department</span>
              <span className="text-white text-sm font-bold">12 Streak</span>
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
            <span className="text-white text-sm font-medium">Question {progressNumber} of {totalQuestions}</span>
            <span className="text-text-muted text-xs">{Math.round((progressNumber / totalQuestions) * 100)}% Completed</span>
          </div>
          <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(15,98,197,0.3)]" 
              style={{ width: `${(progressNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>
      
      {/* Content Area */}
      <div className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-full max-w-[1600px] mx-auto">
          {/* Left Panel: Reading Passage */}
          <div className="lg:col-span-5 h-full flex flex-col bg-surface-dark rounded-2xl border border-white/5 overflow-hidden shadow-sm">
            <div className="p-4 md:p-6 border-b border-white/5 bg-surface-darker/30">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-medium mb-3 border border-blue-500/20">
                <span className="material-symbols-outlined text-[14px]">menu_book</span>
                Reading Passage
              </div>
              <h2 className="text-white text-lg md:text-xl font-bold leading-tight">{passage.title}</h2>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <div className="prose prose-invert prose-p:text-text-muted prose-p:leading-relaxed prose-sm md:prose-lg max-w-none">
                {passage.paragraphs.map((para) => (
                  <p key={para.id} className={`mb-4 ${para.highlighted ? 'bg-primary/5 -mx-2 md:-mx-4 px-2 md:px-4 py-2 rounded-lg border-l-2 border-primary' : ''}`}>
                    <span className={`text-xs font-mono mb-1 block uppercase tracking-wider ${para.highlighted ? 'text-primary' : 'text-text-muted'}`}>
                      Paragraph {para.id}
                    </span>
                    {para.text}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Question */}
          <div className="lg:col-span-7 h-full flex flex-col gap-4 md:gap-6 overflow-y-auto pr-0 lg:pr-2">
            {/* Question Card */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 flex items-center justify-center text-white font-bold flex-shrink-0 border border-white/10 text-sm md:text-base">
                  {question.number}
                </div>
                <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-white leading-snug">
                  {question.text.split(question.highlightedWord).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="text-primary font-bold border-b-2 border-primary/30 px-1">{question.highlightedWord}</span>
                      )}
                    </span>
                  ))}
                </h3>
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 md:gap-4 mt-2">
              {question.options.map((option) => (
                <label
                  key={option.id}
                  className={`group relative flex cursor-pointer rounded-xl md:rounded-2xl border p-4 md:p-5 transition-all hover:border-primary/50 hover:bg-surface-darker hover:shadow-lg hover:shadow-primary/5 ${
                    selectedAnswer === option.id 
                      ? 'border-primary bg-surface-darker' 
                      : 'border-white/10 bg-surface-dark'
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    className="sr-only"
                    checked={selectedAnswer === option.id}
                    onChange={() => setSelectedAnswer(option.id)}
                  />
                  <div className="flex gap-3 md:gap-4 items-center pr-8">
                    <span className={`flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-lg text-base md:text-lg font-bold transition-colors ${
                      selectedAnswer === option.id 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-white/5 text-text-muted group-hover:text-white'
                    }`}>
                      {option.id}
                    </span>
                    <span className="text-sm md:text-base font-medium text-white group-hover:text-primary/90 transition-colors">
                      {option.text}
                    </span>
                  </div>
                  {/* Selection indicator */}
                  <div className={`absolute right-4 md:right-5 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedAnswer === option.id 
                      ? 'border-primary bg-primary' 
                      : 'border-text-muted/30'
                  }`}>
                    {selectedAnswer === option.id && (
                      <span className="material-symbols-outlined text-white text-[14px] md:text-[16px] font-bold">check</span>
                    )}
                  </div>
                </label>
              ))}
            </div>

            {/* Action Bar */}
            <div className="mt-auto pt-4 md:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-white/5">
              <div className="flex gap-2 md:gap-3">
                <button 
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 sm:flex-none px-4 md:px-5 py-2.5 rounded-xl border border-white/10 bg-transparent text-text-muted hover:text-white hover:bg-white/5 hover:border-white/20 transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Previous
                </button>
                <button 
                  onClick={handleSkip}
                  className="flex-1 sm:flex-none px-4 md:px-5 py-2.5 rounded-xl border border-white/10 bg-transparent text-text-muted hover:text-white hover:bg-white/5 hover:border-white/20 transition-all font-medium text-sm"
                >
                  Skip
                </button>
              </div>
              <button 
                onClick={() => handleNext(false)}
                className="group flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedAnswer}
              >
                <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
