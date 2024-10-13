import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";

const Sidebar = ({ active = 'home' }) => {
    let collapsed = localStorage.getItem("collapsed");
    if (collapsed === null) {
        collapsed = false;
    } else {
        collapsed = JSON.parse(collapsed);
    }

    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const [activeLink, setActiveLink] = useState(active);

    const toggleSidebar = () => {
        localStorage.setItem("collapsed", JSON.stringify(!isCollapsed));
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <nav className="nav">
                <ul>
                    <li className={activeLink === 'home' ? 'active' : ''}>
                        <Link to="/overview">
                            <img className='icon' src='../src/assets/home.svg' />
                            {!isCollapsed && <span>Home</span>}
                        </Link></li>
                    <li className={activeLink === 'monthlyreview' ? 'active' : ''} >
                        <Link to="/monthly-review">
                            <img className='icon' src='../src/assets/transaction.svg' />
                            {!isCollapsed && <span>Transactions</span>}
                        </Link>
                    </li>
                    <li className={activeLink === 'accounts' ? 'active' : ''}>
                        <Link to="/accounts">
                            <img className='icon' src='../src/assets/cards.svg' />
                            {!isCollapsed && <span>Accounts</span>}
                        </Link>
                    </li>
                    <li className={activeLink === 'investments' ? 'active' : ''}>
                        <Link to="/investments">
                            <img className='icon' src='../src/assets/investments.svg' />
                            {!isCollapsed && <span>Investments</span>}
                        </Link>
                    </li>
                    <li className={activeLink === 'savings' ? 'active' : ''}>
                        <Link to="/savings">
                            <img className='icon' src='../src/assets/savings.svg' />
                            {!isCollapsed && <span>Savings</span>}
                        </Link>
                    </li>
                    <li className={activeLink === 'assets' ? 'active' : ''}>
                        <Link to="/assets">
                            <img className='icon' src='../src/assets/assets.svg' />
                            {!isCollapsed && <span>Assets</span>}
                        </Link>
                    </li>
                    <li className={activeLink === 'statements' ? 'active' : ''}>
                        <Link to="/statements">
                            <img className='icon' src='../src/assets/statements.svg' />
                            {!isCollapsed && <span>Statements</span>}
                        </Link>
                    </li>
                </ul>
                <button className="toggle-btn" onClick={toggleSidebar}>
                    {isCollapsed ? '>' : '<'}
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
