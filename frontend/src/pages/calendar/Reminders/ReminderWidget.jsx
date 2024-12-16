import { useEffect, useState } from "react";
import { fetchData } from "../../../utility/fetchData";
import ToolTip from "../../../components/tooltip/ToolTip";
import ThreeDots from "../../../assets/options.svg";
import Button from "../../../components/button/Button";
import pops from "pop-message";
import Reminder from "./Reminder";
export default function ReminderWidget() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      name: "Make booking",
      date: "Today",
      category: { id: 1, name: "meetings", colour: "black" },
    },
    {
      id: 2,
      name: "Pay ABSA fees",
      date: "Tomorrow",
      category: { id: 1, name: "payments", colour: "red" },
    },
  ]);
  const [rerender, setRerender] = useState(false);

  // useEffect(() => {
  //   fetchData("http://localhost:3001/calendar/reminders").then((data) => {
  //     setReminders(data.reminders);
  //   });
  // }, [rerender]);

  const handleRerender = () => {
    setRerender((prev) => !prev);
  };

  const handleDelete = async (all = false, reminder = {}) => {
    if (all === false) {
      const confirm = await pops.confirmPop("Delete reminder?");
      if (confirm) {
        fetchData(
          `http://localhost:3001/calendar/reminders/${reminder.id}`,
          "DELETE"
        ).then(() => handleRerender());
      }
    } else {
      const confirm = await pops.confirmPop("Clear all reminders?");
      if (confirm) {
        fetchData(
          "http://localhost:3001/calendar/reminders/all",
          "DELETE"
        ).then(() => handleRerender());
      }
    }
  };

  return (
    <div className="calendar-widget">
      <h2
        className="h2"
        style={{ display: "flex", alignItems: "center", marginTop: "0px" }}
      >
        Reminders{" "}
        <Button className="secondary-btn" styles={{ marginLeft: "10px" }}>
          +
        </Button>
      </h2>
      <ToolTip icon={ThreeDots} styles={{ minWidth: "100px" }}>
        <Button
          className="secondary-btn"
          onClick={() => {
            handleDelete(true);
          }}
        >
          Clear all
        </Button>
      </ToolTip>
      {reminders &&
        reminders.map((reminder) => {
          return (
            <Reminder
              reminder={reminder}
              handleDelete={() => handleDelete(false, reminder)}
            />
          );
        })}
    </div>
  );
}
