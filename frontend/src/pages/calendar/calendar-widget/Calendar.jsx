import "../Calendar.css";
import { getAdjacentMonthInfo } from "../../../utility/dates";

export default function Calendar({
  dateInfo,
  setDateInfo,
  activeDay,
  setActiveDay,
}) {
  const days = Array.from({ length: dateInfo.days }, (_, i) => i + 1);

  const handleClick = (index) => {
    setActiveDay(index);
  };

  const changeMonth = (direction = "next") => {
    setDateInfo(getAdjacentMonthInfo(dateInfo, direction));
  };

  return (
    <div className="calendar-days">
      <div className="calendar-date-wrapper">
        <h3>
          <span className="calendar-year">{dateInfo.year}</span> -{" "}
          <span style={{ display: "inline-block", width: "100px" }}>
            {dateInfo.month}
          </span>
        </h3>
        <button onClick={() => changeMonth("prev")}>{"<"}</button>
        <button onClick={() => changeMonth("next")}>{">"}</button>
      </div>
      <div className="days-wrapper">
        {days.map((day, index) => (
          <button
            className={activeDay === index ? "active-day" : ""}
            onClick={() => handleClick(index)}
            key={index}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
