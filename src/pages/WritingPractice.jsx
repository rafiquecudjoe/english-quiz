import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function WritingPractice() {
  const [essayText, setEssayText] = useState('');
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 20); // 14:20 in seconds
  const [tipsOpen, setTipsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const navigate = useNavigate();
  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return { mins, secs };
  };

  const { mins, secs } = formatTime(timeLeft);

  const handleSubmit = () => {
    if (wordCount < 10) {
      alert("Please write a bit more before submitting!");
      return;
    }
    navigate('/results');
  };

  const handleToolbar = (action) => {
    // In a real app, this would apply formatting to selected text
    alert(`${action} formatting would be applied to selected text`);
  };

  const tips = [
    "Start with a clear thesis statement",
    "Use transition words between paragraphs",
    "Support your arguments with examples",
    "Proofread before submitting"
  ];

  return (
    <div className={`flex flex-col h-full overflow-hidden ${focusMode ? 'bg-black' : ''}`}>
      {/* Top Navigation Bar */}
      {!focusMode && (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-surface-border px-4 md:px-6 py-4 bg-surface-darker z-10">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2 md:gap-4 text-white">
              <Link to="/courses" className="size-10 flex items-center justify-center rounded-full hover:bg-surface-light transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <h2 className="text-base md:text-lg font-bold leading-tight tracking-tight">Writing Practice: Task 2</h2>
            </div>
            <div className="hidden lg:flex gap-3">
              <div className="flex h-8 items-center justify-center gap-x-2 rounded-xl bg-surface-light px-4 border border-white/5">
                <span className="text-base">🔥</span>
                <p className="text-white text-sm font-medium leading-normal">12 Day Streak</p>
              </div>
              <div className="flex h-8 items-center justify-center gap-x-2 rounded-xl bg-surface-light px-4 border border-white/5">
                <span className="material-symbols-outlined text-primary text-[18px]">military_tech</span>
                <p className="text-white text-sm font-medium leading-normal">XP: 1450</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/courses')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 md:px-6 bg-surface-light hover:bg-surface-border text-white text-sm font-bold leading-normal transition-colors border border-white/5"
          >
            <span className="truncate">Save & Exit</span>
          </button>
        </header>
      )}

      {/* Main Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar: Context */}
        {!focusMode && (
          <aside className="w-full lg:w-[400px] xl:w-[450px] flex flex-col border-r border-surface-border bg-surface-darker overflow-y-auto">
            {/* Timer Section */}
            <div className="p-4 md:p-6 border-b border-surface-border">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">Time Remaining</h3>
                {timeLeft < 60 && (
                  <span className="text-xs text-error font-medium animate-pulse">Almost out of time!</span>
                )}
              </div>
              <div className="flex gap-4">
                <div className="flex grow basis-0 flex-col items-stretch gap-2">
                  <div className={`flex h-14 grow items-center justify-center rounded-xl px-3 ${timeLeft < 60 ? 'bg-error/20 border-error/50' : 'bg-surface-light border-white/5'} border`}>
                    <p className={`text-2xl font-bold leading-tight tracking-tight ${timeLeft < 60 ? 'text-error' : 'text-white'}`}>{mins.toString().padStart(2, '0')}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-text-muted text-xs font-normal leading-normal">Minutes</p>
                  </div>
                </div>
                <div className="flex items-center justify-center pb-6 text-surface-border text-2xl font-bold">:</div>
                <div className="flex grow basis-0 flex-col items-stretch gap-2">
                  <div className={`flex h-14 grow items-center justify-center rounded-xl px-3 ${timeLeft < 60 ? 'bg-error/20 border-error/50' : 'bg-surface-light border-white/5'} border`}>
                    <p className={`text-2xl font-bold leading-tight tracking-tight ${timeLeft < 60 ? 'text-error animate-pulse' : 'text-primary'}`}>{secs.toString().padStart(2, '0')}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-text-muted text-xs font-normal leading-normal">Seconds</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Card */}
            <div className="p-4 md:p-6 flex-1">
              <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4">Prompt</h3>
              <div className="flex flex-col gap-4 rounded-xl bg-surface-dark p-4 shadow-sm border border-white/5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">Task 2</span>
                    <span className="text-xs text-text-muted">Min: 250 words</span>
                  </div>
                  <p className="text-white text-lg font-bold leading-tight mt-1">Social Media Impact</p>
                  <p className="text-text-muted text-sm font-normal leading-relaxed">
                    Some people believe that social media has a negative impact on social interaction. To what extent do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience.
                  </p>
                </div>
                <div className="w-full h-32 md:h-40 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-lg overflow-hidden relative flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-white/20">image</span>
                </div>
              </div>

              {/* Tips Accordion */}
              <div className="mt-6">
                <button 
                  onClick={() => setTipsOpen(!tipsOpen)}
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-surface-light text-left hover:bg-surface-border transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                    <span className="text-sm font-bold text-white">Writing Tips</span>
                  </div>
                  <span className={`material-symbols-outlined text-text-muted transition-transform ${tipsOpen ? 'rotate-180' : ''}`}>expand_more</span>
                </button>
                {tipsOpen && (
                  <div className="mt-2 p-4 bg-surface-dark rounded-xl border border-white/5 space-y-2">
                    {tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="material-symbols-outlined text-primary text-[16px] mt-0.5">check_circle</span>
                        {tip}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}

        {/* Right Main: Editor Area */}
        <section className={`flex-1 flex flex-col bg-bg-dark relative ${focusMode ? 'max-w-4xl mx-auto w-full' : ''}`}>
          {/* Toolbar */}
          <div className="px-4 md:px-6 py-3 border-b border-surface-border bg-surface-darker flex items-center justify-between">
            <div className="flex gap-1">
              {[
                { icon: 'format_bold', label: 'Bold' },
                { icon: 'format_italic', label: 'Italic' },
                { icon: 'format_underlined', label: 'Underline' }
              ].map((btn) => (
                <button 
                  key={btn.icon} 
                  onClick={() => handleToolbar(btn.label)}
                  className="p-2 rounded-lg text-text-muted hover:bg-surface-light hover:text-white transition-colors" 
                  title={btn.label}
                >
                  <span className="material-symbols-outlined text-[20px]">{btn.icon}</span>
                </button>
              ))}
              <div className="w-px h-6 bg-surface-border mx-2 self-center"></div>
              {[
                { icon: 'format_list_bulleted', label: 'Bullet List' },
                { icon: 'format_list_numbered', label: 'Numbered List' }
              ].map((btn) => (
                <button 
                  key={btn.icon}
                  onClick={() => handleToolbar(btn.label)}
                  className="p-2 rounded-lg text-text-muted hover:bg-surface-light hover:text-white transition-colors" 
                  title={btn.label}
                >
                  <span className="material-symbols-outlined text-[20px]">{btn.icon}</span>
                </button>
              ))}
            </div>
            <button 
              onClick={() => setFocusMode(!focusMode)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${focusMode ? 'bg-primary text-white' : 'text-text-muted hover:bg-surface-light hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-[20px]">{focusMode ? 'fullscreen_exit' : 'fullscreen'}</span>
              <span className="text-xs font-medium hidden sm:block">{focusMode ? 'Exit Focus' : 'Focus Mode'}</span>
            </button>
          </div>

          {/* Text Area */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden flex flex-col items-center">
            <div className="w-full max-w-[800px] h-full flex flex-col">
              <textarea
                className="w-full h-full bg-transparent border-none p-0 text-gray-100 text-base md:text-lg leading-relaxed focus:ring-0 placeholder:text-text-muted/50 resize-none outline-none font-[Lexend]"
                placeholder="Start typing your essay here..."
                spellCheck="false"
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                autoFocus
              ></textarea>
            </div>
          </div>

          {/* Bottom Metrics Bar */}
          <div className="px-4 md:px-6 py-4 border-t border-surface-border bg-surface-darker flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-6 text-sm">
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Words</span>
                <div className="flex items-baseline gap-1">
                  <span className={`font-bold text-lg ${wordCount >= 250 ? 'text-success' : 'text-white'}`}>{wordCount}</span>
                  <span className="text-text-muted/50">/ 250</span>
                </div>
              </div>
              <div className="w-px h-8 bg-surface-border"></div>
              <div className="flex flex-col">
                <span className="text-text-muted text-xs">Progress</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-surface-light rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${wordCount >= 250 ? 'bg-success' : 'bg-primary'}`}
                      style={{ width: `${Math.min((wordCount / 250) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className={`font-bold text-sm ${wordCount >= 250 ? 'text-success' : 'text-white'}`}>
                    {Math.min(Math.round((wordCount / 250) * 100), 100)}%
                  </span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={wordCount < 10}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary hover:bg-primary-hover text-white text-base font-bold leading-normal tracking-wide transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Submit Essay</span>
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
