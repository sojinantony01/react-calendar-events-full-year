import { getDay, isThisMonth, getDaysInMonth } from 'date-fns';
import Day from './day';
import translation from './utils/translation.json'
interface PropData {
  month: number,
  year: number
}
const weeks = [0, 1, 2, 3, 4, 5, 6];

function Month(props: PropData) {
  const {month, year} = props
  const firstDayOfWeek = getDay(new Date(year, month, 1))

  const getWeekDay = (day: number) => {
    if(firstDayOfWeek <= day && getDaysInMonth(new Date(year, month)) >= (day - firstDayOfWeek + 1)) {
      return <Day month={month} year={year} day={day - firstDayOfWeek + 1}/>
    }
    return <span className='day'></span>
  }

  return (
    <div>
      {weeks.map(week => {
        return <span className="week-head">
          {translation.weeks[week]}
        </span>
      })}
      <div></div>
      {Array.from(Array(42).keys()).map(day => {
        if((day) % 7 !== 0)
          return getWeekDay(day)
        else {
          return <><div></div>{getWeekDay(day)}</>
        }
      })}
    </div>
  );
}

export default Month;
