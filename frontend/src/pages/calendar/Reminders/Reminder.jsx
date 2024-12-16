import "./Reminder.css";
import Button from "../../../components/button/Button";
import deleteIcon from "../../../assets/delete.svg";
export default function Reminder({ handleDelete, reminder }) {
  return (
    <div className="reminder">
      <div className="reminder-left">
        <p>{reminder.name}</p>
        <p>{reminder.date}</p>
      </div>
      <div className="reminder-right">
        <p
          className="reminder-category"
          style={{ backgroundColor: reminder.category.colour }}
        >
          {reminder.category.name || ""}
        </p>
        <Button
          onClick={() => {
            handleDelete();
          }}
          className="secondary-btn"
        >
          <img src={deleteIcon} alt="delete icon" />
        </Button>
      </div>
    </div>
  );
}
