import closeIcon from "../../../assets/close.svg";
import "./User.css";
import { useEffect } from "react";
import logOutIcon from "../../../assets/logout.svg";
import userIcon from "../../../assets/user.svg";
import { fetchData } from "../../../utility/fetchData";

export default function UserWidget({
    showUserWidget,
    closeUserWidget,
    user,
    creditScore = 0,
    netWorth = 0,
}) {
    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeUserWidget();
            }
        };
        if (showUserWidget) {
            document.addEventListener("keydown", handleEscapeKey);
        }
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [showUserWidget, closeUserWidget]);

    const handleLogout = async () => {
        fetchData("http://localhost:3001/logout", "POST").then(() => {
            window.location.href = "/login";
        });
    };

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
                <h3 className="tasks-title">My Account</h3>
                <div className="user-card">
                    <img
                        src={user.profile_image || userIcon}
                        alt="user profile"
                    />
                    <div>
                        <p className="user-fullname">
                            {user.first_name} {user.last_name}
                        </p>
                        <p className="user-grey-data">
                            Credit score: {creditScore}
                        </p>
                        <p className="user-grey-data">
                            Net worth: R{netWorth.net_worth}
                        </p>
                    </div>
                    <img
                        onClick={handleLogout}
                        src={logOutIcon}
                        alt="log out"
                    />
                </div>
            </div>
        )
    );
}
