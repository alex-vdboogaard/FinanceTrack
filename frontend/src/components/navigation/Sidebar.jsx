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
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? '>' : '<'}
            </button>
            <nav className="nav">
                <ul>
                    <li className={activeLink === 'home' ? 'active' : ''}>
                        <Link to="/overview">
                            <img className='icon' src='../src/assets/home.svg' />
                            {!isCollapsed && <span>Home</span>}
                        </Link></li>
                    <li className={activeLink === 'transactions' ? 'active' : ''} >
                        <Link to="/transactions">
                            <img className='icon' src='../src/assets/transaction.svg' />
                            {!isCollapsed && <span>Transactions</span>}
                        </Link>
                    </li>
                    <li className={activeLink === 'cards' ? 'active' : ''}>
                        <Link to="/cards">
                            <img className='icon' src='../src/assets/cards.svg' />
                            {!isCollapsed && <span>Cards</span>}
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
                    <li className={activeLink === 'statements' ? 'active' : ''}>
                        <Link to="/statements">
                            <img className='icon' src='../src/assets/statements.svg' />
                            {!isCollapsed && <span>Statements</span>}
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
