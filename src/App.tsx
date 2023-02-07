import React, { createContext, useState } from 'react';
import './App.css';
import { Register } from './Components/Register';
import { Register1 } from './Components/Register1';
export const dataContext = createContext({})
export const attemptContext = createContext({})
function App() {
  const [otp, setOtp] = useState("")
  const [leftAttempt, setLeftAttempt] = useState(5)
  return (
    <div className="App">
      <dataContext.Provider value={{ otp, setOtp }}>
        <attemptContext.Provider value={{ leftAttempt, setLeftAttempt }}>
          <Register />
          {/* <Register1 /> */}
        </attemptContext.Provider>
      </dataContext.Provider>
    </div>
  );
}

export default App;
