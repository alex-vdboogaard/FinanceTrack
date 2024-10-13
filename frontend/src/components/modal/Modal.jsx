import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, toggleSidebar, children }) => {
    return (

        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <button className="modal-toggle" onClick={toggleSidebar}>
                X
            </button>
            {children}
        </div>
    );
};

export default Modal;
