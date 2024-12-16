import "./Calendar.css";
import ReminderWidget from "./Reminders/ReminderWidget";
export default function Calendar() {
  return (
    <main>
      <h1 className="h1">Calendar</h1>
      <div className="calendar-widgets-wrapper">
        <ReminderWidget></ReminderWidget>
      </div>
    </main>
  );
}
