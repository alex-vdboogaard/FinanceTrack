import closeIcon from "../../../assets/close.svg";
import "./User.css";
import { useEffect, useMemo } from "react";
import logOutIcon from "../../../assets/logout.svg";
import userIcon from "../../../assets/user.svg";
import { fetchData } from "../../../utility/fetchData";

export default function UserWidget({
    showUserWidget,
    closeUserWidget,
    user,
    creditScore = {},
    netWorth = {},
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
    const assets = netWorth.assets;
    const bankAccounts = netWorth.bankAccounts;
    const investments = netWorth.investments;
    const total1 = useMemo(
        () =>
            (assets || []).reduce(
                (acc, asset) => acc + parseFloat(asset.currentValue || 0),
                0
            ),
        [assets]
    );

    const total2 = useMemo(
        () =>
            (bankAccounts || []).reduce(
                (acc, account) => acc + parseFloat(account.balance || 0),
                0
            ),
        [bankAccounts]
    );

    const total3 = useMemo(
        () =>
            (investments || []).reduce(
                (acc, investment) =>
                    acc + parseFloat(investment.currentValue || 0),
                0
            ),
        [investments]
    );

    const totalNetWorth = total1 + total2 + total3;

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
                            Credit score: {creditScore.score}
                        </p>
                        <p className="user-grey-data">
                            Net worth: R{totalNetWorth}
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
