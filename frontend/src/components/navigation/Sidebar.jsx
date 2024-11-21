import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchData } from "../../utility/fetchData";
import "./Sidebar.css";

// Importing icons
import homeIcon from "../../assets/home.svg";
import budgetIcon from "../../assets/budget.svg";
import accountsIcon from "../../assets/cards.svg";
import investmentsIcon from "../../assets/investments.svg";
import savingsIcon from "../../assets/savings.svg";
import assetsIcon from "../../assets/assets.svg";
import statementsIcon from "../../assets/statements.svg";
import loansIcon from "../../assets/loans.svg";
import logoutIcon from "../../assets/logout.svg";
import arrowRightIcon from "../../assets/arrow-right.svg";
import arrowLeftIcon from "../../assets/arrow-left.svg";

const Sidebar = () => {
    const location = useLocation();
    const currentPath = location.pathname; // Get current path from router

    let collapsed = localStorage.getItem("collapsed");
    if (collapsed === null) {
        collapsed = false;
    } else {
        collapsed = JSON.parse(collapsed);
    }

    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const toggleSidebar = () => {
        localStorage.setItem("collapsed", JSON.stringify(!isCollapsed));
        setIsCollapsed(!isCollapsed);
    };

    const isActive = (path) => currentPath === path;

    useEffect(() => {
        fetchData("http://localhost:3001/logged-in").then((response) => {
            if (!response.loggedIn) {
                window.location.href = "/login";
            }
        });
    });

    const handleLogout = async () => {
        fetchData("http://localhost:3001/logout", "POST").then(
            (successData) => {
                window.location.href = "/login";
            }
        );
    };

    return (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
            <nav className="nav">
                <ul>
                    <li className={isActive("/overview") ? "active" : ""}>
                        <Link to="/overview">
                            <img
                                className="icon"
                                src={homeIcon}
                                alt="home-icon"
                            />
                            {!isCollapsed && <span>Home</span>}
                        </Link>
                    </li>
                    <li className={isActive("/budget") ? "active" : ""}>
                        <Link to="/budget">
                            <img
                                className="icon"
                                src={budgetIcon}
                                alt="budget-icon"
                            />
                            {!isCollapsed && <span>Budget</span>}
                        </Link>
                    </li>
                    <li className={isActive("/bank-accounts") ? "active" : ""}>
                        <Link to="/bank-accounts">
                            <img
                                className="icon"
                                src={accountsIcon}
                                alt="accounts-icon"
                            />
                            {!isCollapsed && <span>Accounts</span>}
                        </Link>
                    </li>
                    <li className={isActive("/investments") ? "active" : ""}>
                        <Link to="/investments">
                            <img
                                className="icon"
                                src={investmentsIcon}
                                alt="investments-icon"
                            />
                            {!isCollapsed && <span>Investments</span>}
                        </Link>
                    </li>
                    <li className={isActive("/savings") ? "active" : ""}>
                        <Link to="/savings">
                            <img
                                className="icon"
                                src={savingsIcon}
                                alt="savings-icon"
                            />
                            {!isCollapsed && <span>Savings</span>}
                        </Link>
                    </li>
                    <li className={isActive("/assets") ? "active" : ""}>
                        <Link to="/assets">
                            <img
                                className="icon"
                                src={assetsIcon}
                                alt="assets-icon"
                            />
                            {!isCollapsed && <span>Assets</span>}
                        </Link>
                    </li>
                    <li className={isActive("/loans") ? "active" : ""}>
                        <Link to="/loans">
                            <img
                                className="icon"
                                src={loansIcon}
                                alt="loans-icon"
                            />
                            {!isCollapsed && <span>Loans</span>}
                        </Link>
                    </li>
                    <li className={isActive("/statements") ? "active" : ""}>
                        <Link to="/statements">
                            <img
                                className="icon"
                                src={statementsIcon}
                                alt="statements-icon"
                            />
                            {!isCollapsed && <span>Statements</span>}
                        </Link>
                    </li>
                    <li id="logout" onClick={handleLogout}>
                        <a>
                            <img
                                className="icon"
                                src={logoutIcon}
                                alt="logout-icon"
                            />
                            {!isCollapsed && <span>Log out</span>}
                        </a>
                    </li>
                </ul>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isCollapsed ? (
                        <img src={arrowRightIcon} alt="expand-icon" />
                    ) : (
                        <img src={arrowLeftIcon} alt="collapse-icon" />
                    )}
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
