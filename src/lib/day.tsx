import { isWeekend, isToday, isSameDay, isAfter, isBefore } from "date-fns";
import { useMemo, useState } from "react";
import { MyEvent } from "./model";

interface PropData {
  month: number
  year: number
  day: number
  calendarEvents?: MyEvent[]
}
function Day(props: PropData) {
  const {month, year, day, calendarEvents=[]} = props
  const [show, setShow] = useState(false)  
  const isWeekEnd = useMemo(() =>
    isWeekend(new Date(year, month, day)
  ), [month, year, day]);
  
  const today = useMemo(() =>
    isToday(new Date(year, month, day)
  ), [month, year, day]);
  
  const eventsOfDay = calendarEvents.filter(ev => {
    return isSameDay(new Date(year, month, day), ev.from) || isSameDay(new Date(year, month, day), ev.to)
    || (isAfter(new Date(year, month, day), ev.from) && isBefore(new Date(year, month, day), ev.to))
  })
  const showEvents = () => {
    if(eventsOfDay.length) {
      setShow(true)
    }
  }
  const hideEvents = () => {
    setShow(false)
  }

  return (
    <div onClick={showEvents} tabIndex={0} onBlur={hideEvents} className={`day popup ${isWeekEnd ? "week-end" : ''} ${today ? "today" : ""} ${eventsOfDay.length ? "events-found" : ""}`}>
      {day}
      {show && <div className="popuptext show">
        {eventsOfDay.map((d, i) => {
          return<div key={`event-${i}`}>{d.title} - {d.from.getHours()+":"+d.from.getMinutes()} - {d.to.getHours()+":"+d.to.getMinutes()}</div>
        })}
      </div>}
    </div>
  );
}

export default Day;
