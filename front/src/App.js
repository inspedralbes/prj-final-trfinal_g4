// App.js
// import { join } from 'path';
import './App.css';
import  { useState } from 'react';
import { Index } from './index.js';


function App() {
  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api").then(
  //     res => res.json()
  //     ).then(
  //       data => 
  //       setBackendData(data));
  // }, []);

  const [currentForm, setCurrentForm] = useState('login');
  
    const toggleForm = (formName) => {
      setCurrentForm(formName);
    }
  return (
   
    <div className="App">

    <Index currentForm={currentForm} toggleForm={toggleForm} />
    </div>
  )
 
}

export default App;
