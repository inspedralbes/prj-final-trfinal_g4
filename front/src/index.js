import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Layout } from './Layout';
import { Login } from './componentes/Login';
import { Landing } from './componentes/Landing';
import { Register } from './componentes/Register';
import { Hi } from './componentes/hi';
import { StrictMode } from 'react';
import { Room } from './componentes/Room';
export default function Index() {
  return (
    
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/hi" element={<Hi />} />
              <Route path="/room" element={<Room />} />
            </Route>
         </Routes>
      </BrowserRouter>

  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
  <App />
  </StrictMode>
  
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { Index };