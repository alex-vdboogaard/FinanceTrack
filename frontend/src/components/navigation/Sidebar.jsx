import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchData } from "../../utility/fetchData";
import "./Sidebar.css";

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
                                src="../src/assets/home.svg"
                                alt="home-icon"
                            />
                            {!isCollapsed && <span>Home</span>}
                        </Link>
                    </li>
                    <li className={isActive("/budget") ? "active" : ""}>
                        <Link to="/budget">
                            <img
                                className="icon"
                                src="../src/assets/budget.svg"
                                alt="budget-icon"
                            />
                            {!isCollapsed && <span>Budget</span>}
                        </Link>
                    </li>
                    <li className={isActive("/bank-accounts") ? "active" : ""}>
                        <Link to="/bank-accounts">
                            <img
                                className="icon"
                                src="../src/assets/cards.svg"
                                alt="accounts-icon"
                            />
                            {!isCollapsed && <span>Accounts</span>}
                        </Link>
                    </li>
                    <li className={isActive("/investments") ? "active" : ""}>
                        <Link to="/investments">
                            <img
                                className="icon"
                                src="../src/assets/investments.svg"
                                alt="investments-icon"
                            />
                            {!isCollapsed && <span>Investments</span>}
                        </Link>
                    </li>
                    <li className={isActive("/savings") ? "active" : ""}>
                        <Link to="/savings">
                            <img
                                className="icon"
                                src="../src/assets/savings.svg"
                                alt="savings-icon"
                            />
                            {!isCollapsed && <span>Savings</span>}
                        </Link>
                    </li>
                    <li className={isActive("/assets") ? "active" : ""}>
                        <Link to="/assets">
                            <img
                                className="icon"
                                src="../src/assets/assets.svg"
                                alt="assets-icon"
                            />
                            {!isCollapsed && <span>Assets</span>}
                        </Link>
                    </li>
                    <li className={isActive("/statements") ? "active" : ""}>
                        <Link to="/statements">
                            <img
                                className="icon"
                                src="../src/assets/statements.svg"
                                alt="statements-icon"
                            />
                            {!isCollapsed && <span>Statements</span>}
                        </Link>
                    </li>
                    <li id="logout" onClick={handleLogout}>
                        <a>
                            <img
                                className="icon"
                                src="../src/assets/logout.svg"
                                alt="logout-icon"
                            />
                            {!isCollapsed && <span>Log out</span>}
                        </a>
                    </li>
                </ul>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isCollapsed ? (
                        <img
                            src="../src/assets/arrow-right.svg"
                            alt="expand-icon"
                        />
                    ) : (
                        <img
                            src="../src/assets/arrow-left.svg"
                            alt="collapse-icon"
                        />
                    )}
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
