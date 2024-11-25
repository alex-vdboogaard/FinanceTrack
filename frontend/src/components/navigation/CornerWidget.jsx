import userIcon from "../../assets/user.svg";
import normalBellIcon from "../../assets/normal-bell.svg";
import fullBellIcon from "../../assets/full-bell.svg";
import taskIcon from "../../assets/task.svg";
import "./CornerWidget.css";
import { useEffect, useState } from "react";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";
import NotificationWidget from "./notifications/NotificationsWidget";
import TasksWidget from "./tasks/TasksWidget";

export default function CornerWidget() {
    const [bellIcon, setBellIcon] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showNotificationWidget, setShowNotificationWidget] = useState(false);
    const [showTasksWidget, setShowTasksWidget] = useState(false);
    const [rerender, setRerender] = useState(false);

    const showWidget = (widget) => {
        switch (widget) {
            case "none":
                setShowNotificationWidget(false);
                setShowTasksWidget(false);
                break;
            case "tasks":
                setShowNotificationWidget(false);
                setShowTasksWidget(true);
                break;
            case "notifications":
                setShowNotificationWidget(true);
                setShowTasksWidget(false);
                break;

            default:
                break;
        }
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
        fetchData("http://localhost:3001/user/task").then((data) => {
            setTasks(data.tasks);
        });
    }, [rerender]);
    return (
        <div className="corner-widget">
            <button
                className="corner-widget-button"
                onClick={() => showWidget("tasks")}
            >
                <img src={taskIcon} alt="tasks icon" />
            </button>
            <button
                className="corner-widget-button"
                onClick={() => showWidget("notifications")}
            >
                <img
                    src={bellIcon === false ? normalBellIcon : fullBellIcon}
                    alt="user icon"
                />
            </button>
            <NotificationWidget
                notifications={notifications}
                showNotificationWidget={showNotificationWidget}
                closeNotificationWidget={() => {
                    showWidget("none");
                }}
                rerender={handleRerender}
            ></NotificationWidget>
            <TasksWidget
                showTasksWidget={showTasksWidget}
                closeTasksWidget={() => {
                    showWidget("none");
                }}
                tasks={tasks}
                rerender={handleRerender}
            ></TasksWidget>
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
