import { useState } from 'react';
import { getYear, getMonth } from 'date-fns';
import Month from './month';
import translation from './utils/translation.json'
import { MyEvent } from './model';
import './style.scss';

interface PropData {
  defaultMonth?: number
  defaultYear?: number
  yearViewTiles?: number
  calendarEvents?: MyEvent[]
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
  const tiles = props.yearViewTiles ? props.yearViewTiles : 4 
  const [monthView, setMonthView] = useState(true);
  const changeYear = (val: number) => {
    setState({...state, year: state.year + val})
  }
  const changeMonth = (val: number) => {
    let temp = {...state}
    temp.month = temp.month + val
    if(temp.month > 11) {
      temp.month = 0;
      temp.year += 1
    } else if(temp.month < 0) {
      temp.month = 11;
      temp.year -= 1
    }
    setState(temp)
  }
  return (
      <div className="react-calendar-events">
        <div onClick={()=>setMonthView(!monthView)}>
          {monthView ? "Year View" : "Month View"}
        </div>
        {monthView ? 
          <div className="month-view">
              <div className='month-head'>
                <span onClick={()=>changeYear(-1)}>-</span>
                {state.year}
                <span onClick={()=>changeYear(1)}>+</span>
              </div>
              <div className='month-head'>
                <span onClick={()=>changeMonth(-1)}>-</span>
                {translation.months[state.month]}
                <span onClick={()=>changeMonth(1)}>+</span>
              </div>
            <Month {...state} calendarEvents={props.calendarEvents}/>
        </div>
        :
        <div>
          <style>
            {`.react-calendar-events .month {
              width: ${92/tiles}%
            }`}
          </style>
          <div className='year-head'>
            <span onClick={()=>changeYear(-1)}>-</span>
            {state.year}
            <span onClick={()=>changeYear(1)}>+</span>
          </div>
          <div className='year-view'>
            {months.map(month => {
            return <div className="month" key={month}> 
                <div className='month-head'>{translation.months[month]}</div>
                <Month year={state.year} month={month} calendarEvents={props.calendarEvents}/>
              </div>
            })}
          </div>
        </div>}
      </div>
  );
}

export default Calendar;
