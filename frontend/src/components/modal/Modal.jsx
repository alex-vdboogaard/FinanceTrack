import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, toggleSidebar, children }) => {
    return (

        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <button className="modal-toggle" onClick={toggleSidebar}>
                <img src="../src/assets/close.svg" alt="close icon" />
            </button>
            {children}
        </div>
    );
};

export default Modal;
