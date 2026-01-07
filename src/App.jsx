import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CourseSelection from './pages/CourseSelection';
import WritingPractice from './pages/WritingPractice';
import ComprehensionQuiz from './pages/ComprehensionQuiz';
import ComprehensionCloze from './pages/ComprehensionCloze';
import VocabularyQuiz from './pages/VocabularyQuiz';
import GrammarPractice from './pages/GrammarPractice';
import PerformanceDashboard from './pages/PerformanceDashboard';
import AssessmentResults from './pages/AssessmentResults';
import UserProfile from './pages/UserProfile';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* App routes with sidebar layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="courses" element={<CourseSelection />} />
            <Route path="writing" element={<WritingPractice />} />
            <Route path="comprehension" element={<ComprehensionQuiz />} />
            <Route path="comprehension-cloze" element={<ComprehensionCloze />} />
            <Route path="vocabulary" element={<VocabularyQuiz />} />
            <Route path="grammar" element={<GrammarPractice />} />
            <Route path="performance" element={<PerformanceDashboard />} />
            <Route path="results" element={<AssessmentResults />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
