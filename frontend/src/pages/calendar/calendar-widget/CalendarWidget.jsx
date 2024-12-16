import { useState } from "react";
import Button from "../../../components/button/Button";
import Calendar from "./Calendar";
export default function CalendarWidget() {
  const [rerender, setRerender] = useState("");
  const [activeDay, setActiveDay] = useState(1);
  const [month, setMonth] = useState("");
  const [newEventName, setNewEventName] = useState("");
  const handleRerender = () => {
    setRerender((prev) => !prev);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //add event logic
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
              onChange={(e) => handleChange(e)}
            />
          </div>
          <Button className="primary-btn" type="submit" onClick={handleSubmit}>
            Add event
          </Button>
        </form>
      </div>
      <Calendar
        rerender={handleRerender}
        activeDay={activeDay}
        setActiveDay={setActiveDay}
      ></Calendar>
    </div>
  );
}
