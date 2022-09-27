import React, { useState } from 'react';
import { getYear, getMonth } from 'date-fns';
import Month from './month';
import translation from './utils/translation.json'
import { MyEvent } from './model';
import './style.scss';

interface PropData {
  defaultMonth?: number
  defaultYear?: number
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
        <div className='react_calendar_top_toggle_bar'>
          <div className='react_calendar_top_toggle_container'>
              {monthView ?  
                  <div className='react_calendar_flex_box'>
                    <div className='react_calendar_flex_box react_calendar_margin'>
                      <div className='react_calendar_round_toggle react_calendar_margin' onClick={()=>changeYear(-1)}>-</div>
                      <div className='react_calendar_round_toggle react_calendar_margin'>{state.year}</div>
                      <div className='react_calendar_round_toggle react_calendar_margin' onClick={()=>changeYear(1)}>+</div>
                    </div>
                    <div className='react_calendar_flex_box'>
                      <div className='react_calendar_round_toggle react_calendar_margin' onClick={()=>changeMonth(-1)}>-</div>
                      <div className='react_calendar_round_toggle react_calendar_margin'>{translation.months[state.month]}</div>
                      <div className='react_calendar_round_toggle' onClick={()=>changeMonth(1)}>+</div>
                    </div>
                  </div>
                : 
                  <div className='react_calendar_flex_box'>
                    <div className='react_calendar_round_toggle react_calendar_margin' onClick={()=>changeYear(-1)}>-</div>
                    <div className='react_calendar_round_toggle react_calendar_margin'>{state.year}</div>
                    <div className='react_calendar_round_toggle' onClick={()=>changeYear(1)}>+</div>
                  </div>
              }
          </div>
          <div className='react_calendar_top_toggle_view_switch_container'>
              <div onClick={()=>setMonthView(!monthView)} className="react_calendar_round_toggle">
                {monthView ? "Year View" : "Month View"}
              </div>
          </div>
        </div>
        
        {monthView ? 
          <div className='react_calendar_flex_box'>
            <div className="month-view">   
              <Month {...state} calendarEvents={props.calendarEvents}/>
            </div>
          </div>
        :
        <div>         
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
