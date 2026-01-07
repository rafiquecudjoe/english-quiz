import { createContext, useContext, useState } from 'react';

const QuizContext = createContext(null);

export function QuizProvider({ children }) {
  const [quizResults, setQuizResults] = useState(null);

  const saveResults = (results) => {
    setQuizResults({
      ...results,
      completedAt: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });
  };

  const clearResults = () => {
    setQuizResults(null);
  };

  return (
    <QuizContext.Provider value={{ quizResults, saveResults, clearResults }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
