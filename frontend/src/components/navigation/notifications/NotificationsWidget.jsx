import { useState } from "react";
import closeIcon from "../../../assets/close.svg";
import Notification from "./Notification";
import "./Notifications.css";

export default function NotificationWidget({
    showNotificationWidget,
    closeNotificationWidget,
    notifications,
    rerender,
}) {
    const rerenderNotifications = (id) => {
        rerender();
    };

    return (
        showNotificationWidget && (
            <div className="notification-widget">
                <button
                    onClick={() => {
                        closeNotificationWidget();
                    }}
                    className="close-icon"
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
                <h3 className="notifications-title">Notifications</h3>

                {notifications &&
                    notifications.map((not) => {
                        return (
                            <Notification
                                rerender={rerenderNotifications}
                                key={not.id}
                                notification={not}
                            />
                        );
                    })}
            </div>
        )
    );
}
