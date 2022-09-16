import { useState } from 'react';
import { getYear, getMonth } from 'date-fns';
import Month from './month';
import translation from './utils/translation.json'
import './style.css'
interface PropData {
  defaultMonth?: number,
  defaultYear?: number
}
interface State {
  month: number
  year: number
}
const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const getValidMonth = (month?: number): number => {
  if((month || month === 0) && month < 11 && month > 0) {
    return month;
  }
  return getMonth(new Date());
} 
function Calendar(props: PropData) {
  const [state, setState] = useState<State>({
    month: getValidMonth(props.defaultMonth),
    year: props.defaultYear ? props.defaultYear : getYear(new Date())
  })
  const [monthView, setMonthView] = useState(true);
  return (
    <>
    <div onClick={()=>setMonthView(!monthView)}>{monthView ? "Year View" : "Month View"}</div>
      {monthView ?<div>
        <div className="month">
          <div><span onClick={()=>setState({...state, year:state.year-1})}>-</span>{state.year}<span onClick={()=>setState({...state, year:state.year+1})}>+</span></div>
          <div><span onClick={()=>setState({...state, month:state.month-1})}>-</span>{translation.months[state.month]}<span onClick={()=>setState({...state, month:state.month+1})}>+</span></div>
        </div>
        <Month {...state}/>
      </div>
      :
      <div>
        <div><span onClick={()=>setState({...state, year:state.year-1})}>-</span>{state.year}<span onClick={()=>setState({...state, year:state.year+1})}>+</span></div>
        {months.map(month => {
         return <div className="month"> 
            <div>{translation.months[month]}</div>
            <Month year={state.year} month={month}/>
          </div>
        })}
      </div>}
    </>
  );
}

export default Calendar;
