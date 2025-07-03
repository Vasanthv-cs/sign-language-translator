import React, { useState } from 'react';
import WebcamFeed from './components/WebcamFeed';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'app dark' : 'app'}>
      <header className="header">
        <h1>🧏 Sign Language Translator</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      <main>
        <WebcamFeed />
      </main>

      <footer>
        <p>Assistive Communication App | Built for Accessibility 💙</p>
      </footer>
    </div>
  );
};

export default App;
