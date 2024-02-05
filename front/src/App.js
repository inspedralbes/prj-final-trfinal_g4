// App.js
import React, { useState } from 'react';
import { Index } from './index.js';
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">

      <Index currentForm={currentForm} toggleForm={toggleForm} />

    </div>
  );
}

export default App;
