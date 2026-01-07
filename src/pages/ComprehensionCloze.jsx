import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const passage = {
  title: 'The Art of Communication',
  text: `Effective communication is one of the most __(1)__ skills in both personal and professional life. It involves not only the ability to express ideas clearly but also the __(2)__ to listen actively to others.

In today's digital age, written communication has become __(3)__ important than ever before. Emails, text messages, and social media posts have __(4)__ traditional face-to-face conversations in many situations.

However, this shift has also brought new __(5)__. Many people struggle to convey tone and emotion through written words, leading to __(6)__ and confusion. The absence of facial expressions and body language can make it __(7)__ to understand the true meaning behind a message.

To overcome these obstacles, experts recommend being __(8)__ in our written communication. Using clear language, appropriate punctuation, and sometimes even emojis can help __(9)__ the gap between digital and in-person interactions. Additionally, taking time to __(10)__ our messages before sending can prevent many communication mishaps.`
};

const blanks = [
  { id: 1, correctAnswer: 'important' },
  { id: 2, correctAnswer: 'ability' },
  { id: 3, correctAnswer: 'increasingly' },
  { id: 4, correctAnswer: 'replaced' },
  { id: 5, correctAnswer: 'challenges' },
  { id: 6, correctAnswer: 'misunderstandings' },
  { id: 7, correctAnswer: 'difficult' },
  { id: 8, correctAnswer: 'intentional' },
  { id: 9, correctAnswer: 'bridge' },
  { id: 10, correctAnswer: 'review' },
];

const wordBank = [
  'important', 'ability', 'increasingly', 'replaced', 'challenges',
  'misunderstandings', 'difficult', 'intentional', 'bridge', 'review'
];

export default function ComprehensionCloze() {
  const [answers, setAnswers] = useState({});
  const [showWordBank, setShowWordBank] = useState(true);
  const [activeBlank, setActiveBlank] = useState(null);
  const [timeLeft, setTimeLeft] = useState(18 * 60 + 45);
  const navigate = useNavigate();

  const filledCount = Object.values(answers).filter(a => a).length;

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

  const handleAnswerChange = (blankId, value) => {
    setAnswers({ ...answers, [blankId]: value });
  };

  const handleWordBankClick = (word) => {
    if (activeBlank) {
      handleAnswerChange(activeBlank, word);
      // Move to next empty blank
      const nextEmpty = blanks.find(b => b.id > activeBlank && !answers[b.id]);
      setActiveBlank(nextEmpty ? nextEmpty.id : null);
    } else {
      // Find first empty blank
      const firstEmpty = blanks.find(b => !answers[b.id]);
      if (firstEmpty) {
        handleAnswerChange(firstEmpty.id, word);
        const nextEmpty = blanks.find(b => b.id > firstEmpty.id && !answers[b.id]);
        setActiveBlank(nextEmpty ? nextEmpty.id : null);
      }
    }
  };

  const isWordUsed = (word) => {
    return Object.values(answers).includes(word);
  };

  const handleClearAll = () => {
    setAnswers({});
    setActiveBlank(null);
  };

  const handleSubmit = () => {
    navigate('/results');
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
            <span className="text-white font-medium">Cloze Passage</span>
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
            <span className="text-white text-sm font-medium">{filledCount} of {blanks.length} blanks filled</span>
            <span className="text-text-muted text-xs">{Math.round((filledCount / blanks.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-surface-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-500 rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
              style={{ width: `${(filledCount / blanks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-full max-w-[1600px] mx-auto">
          {/* Left Panel: Passage */}
          <div className="lg:col-span-7 h-full flex flex-col bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-white/5 bg-surface-darker/30">
              <div className="inline-flex items-center gap-2 px-2 py-1 rounded bg-purple-500/10 text-purple-400 text-xs font-medium mb-3 border border-purple-500/20">
                <span className="material-symbols-outlined text-[14px]">text_fields</span>
                Cloze Passage
              </div>
              <h2 className="text-white text-lg md:text-xl font-bold leading-tight">{passage.title}</h2>
            </div>
            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <div className="text-text-muted text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                {passage.text.split(/__\((\d+)\)__/).map((part, index) => {
                  if (index % 2 === 1) {
                    const blankId = parseInt(part);
                    const isActive = activeBlank === blankId;
                    const isFilled = !!answers[blankId];
                    return (
                      <span key={index} className="inline-block mx-1">
                        <input
                          type="text"
                          value={answers[blankId] || ''}
                          onChange={(e) => handleAnswerChange(blankId, e.target.value)}
                          onFocus={() => setActiveBlank(blankId)}
                          placeholder={`(${blankId})`}
                          className={`w-28 md:w-32 px-2 md:px-3 py-1 rounded-lg text-center font-medium transition-all border-2 focus:outline-none text-sm md:text-base ${
                            isActive
                              ? 'bg-purple-500/30 border-purple-500 text-white ring-2 ring-purple-500/30'
                              : isFilled
                              ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' 
                              : 'bg-surface-light border-surface-border text-white hover:border-purple-500/30'
                          }`}
                        />
                      </span>
                    );
                  }
                  return <span key={index}>{part}</span>;
                })}
              </div>
            </div>
          </div>

          {/* Right Panel: Word Bank & Answers */}
          <div className="lg:col-span-5 h-full flex flex-col gap-4 md:gap-6 overflow-y-auto">
            {/* Word Bank Toggle */}
            <div className="bg-surface-dark rounded-2xl border border-white/5 overflow-hidden">
              <button 
                onClick={() => setShowWordBank(!showWordBank)}
                className="w-full flex items-center justify-between p-4 hover:bg-surface-light transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-purple-400">help</span>
                  <span className="text-white font-bold">Word Bank (Click to fill)</span>
                </div>
                <span className={`material-symbols-outlined text-text-muted transition-transform ${showWordBank ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {showWordBank && (
                <div className="p-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {wordBank.map((word) => {
                      const used = isWordUsed(word);
                      return (
                        <button
                          key={word}
                          onClick={() => !used && handleWordBankClick(word)}
                          disabled={used}
                          className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                            used
                              ? 'bg-surface-light/50 text-text-muted/50 border-white/5 line-through cursor-not-allowed'
                              : 'bg-surface-light text-text-muted border-white/5 hover:border-purple-500/50 hover:text-purple-300 hover:bg-purple-500/10 cursor-pointer'
                          }`}
                        >
                          {word}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-text-muted/60 text-xs mt-3">
                    💡 Click a blank in the passage first, then click a word to fill it in.
                  </p>
                </div>
              )}
            </div>

            {/* Answers List */}
            <div className="bg-surface-dark rounded-2xl border border-white/5 p-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold">Your Answers</h3>
                {filledCount > 0 && (
                  <button 
                    onClick={handleClearAll}
                    className="text-xs text-text-muted hover:text-error transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">delete</span>
                    Clear All
                  </button>
                )}
              </div>
              <div className="space-y-2 md:space-y-3">
                {blanks.map((blank) => (
                  <div 
                    key={blank.id} 
                    className={`flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer ${activeBlank === blank.id ? 'bg-purple-500/10' : 'hover:bg-surface-light'}`}
                    onClick={() => setActiveBlank(blank.id)}
                  >
                    <span className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center font-bold text-xs md:text-sm ${
                      answers[blank.id] 
                        ? 'bg-purple-500/20 text-purple-400' 
                        : activeBlank === blank.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-surface-light text-text-muted'
                    }`}>
                      {blank.id}
                    </span>
                    <div className="flex-1 h-9 md:h-10 px-3 rounded-lg bg-surface-light border border-white/5 flex items-center">
                      <span className={answers[blank.id] ? 'text-white text-sm md:text-base' : 'text-text-muted/50 italic text-sm'}>
                        {answers[blank.id] || 'Not answered'}
                      </span>
                    </div>
                    {answers[blank.id] && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnswerChange(blank.id, '');
                        }}
                        className="text-text-muted hover:text-error transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSubmit}
              disabled={filledCount < blanks.length}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Submit Answers</span>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
