import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupForm from './components/Pages/SignupForm';
import LoginForm from './components/Pages/LoginForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;