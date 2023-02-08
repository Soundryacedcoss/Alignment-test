import React, { createContext, useState } from 'react';
import './App.css';
import { Register } from './Components/Register';
export const dataContext = createContext({})
function App() {
  const [otp, setOtp] = useState("")
  return (
    <div className="App">
      <dataContext.Provider value={{ otp, setOtp }}>
          <Register />
          {/* <Register1 /> */}
      </dataContext.Provider>
    </div>
  );
}

export default App;
