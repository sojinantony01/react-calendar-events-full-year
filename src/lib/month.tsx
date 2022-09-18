import { getDay, getDaysInMonth } from 'date-fns';
import Day from './day';
import { MyEvent } from './model';
import translation from './utils/translation.json'
interface PropData {
  month: number,
  year: number
  calendarEvents?: MyEvent[]
}
const weeks = [0, 1, 2, 3, 4, 5, 6];

function Month(props: PropData) {
  const {month, year, calendarEvents} = props
  const firstDayOfWeek = getDay(new Date(year, month, 1))

  const getWeekDay = (day: number) => {
    if(firstDayOfWeek <= day && getDaysInMonth(new Date(year, month)) >= (day - firstDayOfWeek + 1)) {
      return <Day month={month} year={year} day={day - firstDayOfWeek + 1} key={`${year} ${month} ${day}`} calendarEvents={calendarEvents}/>
    }
    return <div className='day' key={`${year} ${month} ${day}`}></div>
  }

  return (
    <div>
      {weeks.map((week, index) => {
        return <div key={index} className={`week-head ${index === 0 || index === weeks.length-1 ? "week-end" : ""}`}>
          {translation.weeks[week]}
        </div>
      })}
      <div></div>
      {Array.from(Array(42).keys()).map(day => {
          return getWeekDay(day)
      })}
    </div>
  );
}

export default Month;
