import React, { useState } from 'react';
import Calendar from './lib';
import tempEvents from "./temp-events.json"
import './App.css';

interface MyEvent {
  id: string
  title: string
  from: Date
  to: Date
}
interface State {

}
function App() {
  const [state, setState] = useState<State>({})
  const [calendarEvents, setEvents] = useState<MyEvent[]>(tempEvents.map(d => ({...d, from: new Date(d.from), to: new Date(d.to)})));
  
  return (
    <>
      <div className="App">
        <Calendar {...state} calendarEvents={calendarEvents}/>
      </div>
      <div>
              @ Sojin Antony
      </div>
    </>
  );
}

export default App;
