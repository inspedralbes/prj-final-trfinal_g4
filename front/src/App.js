// App.js
// import { join } from 'path';
import './App.css';
import  { useState } from 'react';
import { Index } from './index.js';


function App() {
  const [currentForm, setCurrentForm] = useState('login');
  
    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }

  return (
    <Index currentForm={currentForm} toggleForm={toggleForm} />
  )
 
}

export default App;
