import BlueDot from "../../../assets/blue-dot.svg";
import closeIcon from "../../../assets/close.svg";
import { formatTimeAgo } from "../../../utility/dates";
import { fetchData } from "../../../utility/fetchData";
export default function Notification({ notification, rerender }) {
    const handleDelete = (id) => {
        fetchData(
            `http://localhost:3001/user/notification/${id}`,
            "DELETE"
        ).then(() => {
            rerender(id);
        });
    };
    return (
        <div className="notification">
            <img src={BlueDot} className="blue-dot" />
            <div>
                <p className="notification-title">{notification.title}</p>
                <p className="notification-description">
                    {notification.description}
                </p>
                <p className="notification-date">
                    {formatTimeAgo(notification.created_at.toString())}
                </p>
            </div>
            <button
                className="delete-notification-icon"
                onClick={() => {
                    handleDelete(notification.id);
                }}
            >
                <img src={closeIcon} alt="close icon" />
            </button>
        </div>
    );
}
