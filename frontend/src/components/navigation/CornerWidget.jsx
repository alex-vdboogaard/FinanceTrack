import userIcon from "../../assets/user.svg";
import normalBellIcon from "../../assets/normal-bell.svg";
import fullBellIcon from "../../assets/full-bell.svg";
import "./CornerWidget.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";
import NotificationWidget from "./notifications/NotificationsWidget";

export default function CornerWidget() {
    const [bellIcon, setBellIcon] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotificationWidget, setShowNotificationWidget] = useState(false);
    const [rerender, setRerender] = useState(false);

    const toggleNotificationWidget = () => {
        setShowNotificationWidget((prev) => !prev);
    };

    const handleRerender = () => {
        setRerender((prev) => !prev);
    };

    useEffect(() => {
        fetchData("http://localhost:3001/user/notification").then((data) => {
            if (data.notifications.length === 0) {
                setBellIcon(false);
            } else {
                setBellIcon(true);
            }
            setNotifications(data.notifications);
        });
    }, [rerender]);
    return (
        <div className="corner-widget">
            <button
                className="corner-widget-button"
                onClick={() => toggleNotificationWidget()}
            >
                <img
                    src={bellIcon === false ? normalBellIcon : fullBellIcon}
                    alt="user icon"
                />
            </button>
            <NotificationWidget
                notifications={notifications}
                showNotificationWidget={showNotificationWidget}
                closeNotificationWidget={toggleNotificationWidget}
                rerender={handleRerender}
            ></NotificationWidget>
            <button
                onClick={() => {
                    pops.simplePop("error", "Coming soon!");
                }}
            >
                <img src={userIcon} alt="user icon" />
            </button>
        </div>
    );
}
