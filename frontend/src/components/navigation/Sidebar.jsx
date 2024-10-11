import React, { useState } from 'react';
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
    const handleLinkClick = (link) => {
        setActiveLink(link);
        window.location.href = (`/${link}`)
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                {isCollapsed ? '>' : '<'}
            </button>
            <nav className="nav">
                <ul>
                    <li className={activeLink === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>
                        <img className='icon' src='../src/assets/home.svg' />
                        {!isCollapsed && <span>Home</span>}
                    </li>
                    <li className={activeLink === 'transactions' ? 'active' : ''} onClick={() => handleLinkClick('transactions')}>
                        <img className='icon' src='../src/assets/transaction.svg' />
                        {!isCollapsed && <span>Transactions</span>}
                    </li>
                    <li className={activeLink === 'cards' ? 'active' : ''} onClick={() => handleLinkClick('cards')}>
                        <img className='icon' src='../src/assets/cards.svg' />
                        {!isCollapsed && <span>Cards</span>}
                    </li>
                    <li className={activeLink === 'investments' ? 'active' : ''} onClick={() => handleLinkClick('investments')}>
                        <img className='icon' src='../src/assets/investments.svg' />
                        {!isCollapsed && <span>Investments</span>}
                    </li>
                    <li className={activeLink === 'savings' ? 'active' : ''} onClick={() => handleLinkClick('savings')}>
                        <img className='icon' src='../src/assets/savings.svg' />
                        {!isCollapsed && <span>Savings</span>}
                    </li>
                    <li className={activeLink === 'statements' ? 'active' : ''} onClick={() => handleLinkClick('statements')}>
                        <img className='icon' src='../src/assets/statements.svg' />
                        {!isCollapsed && <span>Statements</span>}
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
