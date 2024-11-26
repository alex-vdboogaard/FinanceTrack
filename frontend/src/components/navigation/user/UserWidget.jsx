import closeIcon from "../../../assets/close.svg";
import "./User.css";
import { useEffect } from "react";

export default function UserWidget({
    showUserWidget,
    closeUserWidget,
    data,
    rerender,
}) {
    const rerenderUser = () => {
        rerender();
    };

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeUserWidget();
            }
        };

        // Add event listener when the component mounts
        if (showUserWidget) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        // Cleanup event listener when the component unmounts or widget is hidden
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [showUserWidget, closeUserWidget]);

    return (
        showUserWidget && (
            <div className="user-widget">
                <button
                    onClick={() => {
                        closeUserWidget();
                    }}
                    className="close-icon"
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h3 className="tasks-title">My Account</h3>
                </div>
                {data && <p>Credit score: {data.credit_score[0].score}</p>}
            </div>
        )
    );
}
