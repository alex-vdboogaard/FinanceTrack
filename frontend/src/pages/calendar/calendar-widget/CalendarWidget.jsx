import { useState } from "react";
import Button from "../../../components/button/Button";
import Calendar from "./Calendar";
import { getCurrentMonthInfo } from "../../../utility/dates";

export default function CalendarWidget() {
  const [rerender, setRerender] = useState(false);
  const [dateInfo, setDateInfo] = useState(getCurrentMonthInfo());
  const [newEventName, setNewEventName] = useState("");
  const [activeDay, setActiveDay] = useState(1);

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRerender();
  };

  const handleChange = (e) => {
    setNewEventName(e.target.value);
  };

  return (
    <div className="calendar-widget calendar">
      <div>
        <h2 className="h2">New event</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="Event name">Event name</label>
            <input
              className="normal-input"
              type="text"
              onChange={handleChange}
            />
          </div>
          <Button className="primary-btn" type="submit" onClick={handleSubmit}>
            Add event
          </Button>
        </form>
      </div>
      <Calendar
        dateInfo={dateInfo}
        setDateInfo={setDateInfo}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      />
    </div>
  );
}
