import "../Calendar.css";
export default function Calendar({ rerender, activeDay, setActiveDay }) {
  const days = [];
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }
  const handleClick = (index) => {
    setActiveDay(index);
  };
  return (
    <div className="calendar-days">
      <h3>
        <span className="calendar-year">2023</span> - August
      </h3>
      <div className="days-wrapper">
        {days.map((day, index) => {
          return activeDay === index ? (
            <a className="active-day" key={index}>
              {index}
            </a>
          ) : (
            <a
              onClick={() => {
                handleClick(index);
              }}
              key={index}
            >
              {index}
            </a>
          );
        })}
      </div>
    </div>
  );
}
