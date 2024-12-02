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
import UserWidget from "./user/UserWidget";

export default function CornerWidget() {
    const [bellIcon, setBellIcon] = useState(false);

    const [notifications, setNotifications] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [userData, setUserData] = useState({});
    const [creditScore, setCreditScore] = useState(0);
    const [netWorthData, setNetWorthData] = useState({});

    const [showNotificationWidget, setShowNotificationWidget] = useState(false);
    const [showTasksWidget, setShowTasksWidget] = useState(false);
    const [showUserWidget, setShowUserWidget] = useState(false);

    const [rerender, setRerender] = useState(false);

    const showWidget = (widget) => {
        switch (widget) {
            case "none":
                setShowNotificationWidget(false);
                setShowTasksWidget(false);
                setShowUserWidget(false);
                break;
            case "tasks":
                setShowNotificationWidget(false);
                setShowTasksWidget(true);
                setShowUserWidget(false);
                break;
            case "notifications":
                setShowNotificationWidget(true);
                setShowTasksWidget(false);
                setShowUserWidget(false);
                break;
            case "user":
                setShowNotificationWidget(false);
                setShowTasksWidget(false);
                setShowUserWidget(true);
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
        fetchData("http://localhost:3001/user").then((data) => {
            setUserData(data.user);
        });
        fetchData("http://localhost:3001/user/credit-score").then((data) => {
            setCreditScore(data.credit_score);
        });
        fetchData("http://localhost:3001/user/credit-score").then((data) => {
            setNetWorthData(data);
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
                    alt="notifications icon"
                />
            </button>
            <button
                className="corner-widget-button"
                onClick={() => showWidget("user")}
            >
                <img src={userIcon} alt="user icon" />
            </button>
            <TasksWidget
                showTasksWidget={showTasksWidget}
                closeTasksWidget={() => {
                    showWidget("none");
                }}
                tasks={tasks}
                rerender={handleRerender}
            ></TasksWidget>
            <NotificationWidget
                notifications={notifications}
                showNotificationWidget={showNotificationWidget}
                closeNotificationWidget={() => {
                    showWidget("none");
                }}
                rerender={handleRerender}
            ></NotificationWidget>
            <UserWidget
                showUserWidget={showUserWidget}
                closeUserWidget={() => {
                    showWidget("none");
                }}
                user={userData}
                creditScore={creditScore}
                netWorth={netWorthData}
            ></UserWidget>
        </div>
    );
}
