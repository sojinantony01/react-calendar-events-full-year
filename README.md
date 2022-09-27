# react-calendar-event-full-year

A simple events calendar with year and month view

## Getting Started

```
npm install react-calendar-event-full-year --save

```


## [Live demo](https://sojinantony01.github.io/react-calendar-events-full-year/)



![alt text](https://raw.githubusercontent.com/sojinantony01/react-calendar-events-full-year/main/public/images/month.png)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-calendar-events-full-year/main/public/images/year.png)

![alt text](https://raw.githubusercontent.com/sojinantony01/react-calendar-events-full-year/main/public/images/year-event.png)



```
import Calendar from 'react-calendar-event-full-year'

const tempEvents = [
  {
    "id": "1",
    "title": "test title - 4",
    "from": "2022-06-10T11:33:35.833Z",
    "to":  "2022-07-29T14:33:35.833Z"
  }
]

function App() {
  const [calendarEvents, setEvents] = useState<MyEvent[]>(tempEvents.map(d => ({...d, from: new Date(d.from), to: new Date(d.to)})));
  
  return (
    <div className="">
      <Calendar calendarEvents={calendarEvents}/>
    </div>
  );
}

export default App;

```
## props

| Prop | Description | Default | Mandatory
| --- | --- | -- | -- |
| defaultMonth | Default selected month  | This month  |  No |
| defaultYear | Default selected year  | This year  |  No |
| calendarEvents | Event JSON | [] | No
| monthView | Month view of Year View | false | No


## TranslateFn

  Development in progress



[Sojin Antony](https://github.com/sojinantony01)

