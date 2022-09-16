import React, { useState } from 'react';
import Calendar from './lib';
import './App.css';
interface State {

}
function App() {
  const [state, setState] = useState<State>({})
  return (
    <div className="App">
      <Calendar {...state}/>
    </div>
  );
}

export default App;
