interface PropData {
  month: number
  year: number
  day: number
}
function Day(props: PropData) {
  return (
    <span className="day">
      {props.day}
    </span>
  );
}

export default Day;
