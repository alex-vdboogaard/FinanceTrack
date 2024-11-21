import React from "react";
import "./Modal.css";
import closeIcon from "../../assets/close.svg";

const Modal = ({ isOpen, toggleSidebar, children, type = null }) => {
    if (type === "center") {
        return (
            <div className={`center-modal ${isOpen ? "open" : ""}`}>
                <button className="modal-toggle-right" onClick={toggleSidebar}>
                    <img src={closeIcon} alt="close icon" />
                </button>
                <div>{children}</div>
            </div>
        );
    } else {
        return (
            <div className={`modal ${isOpen ? "open" : ""}`}>
                <button className="modal-toggle" onClick={toggleSidebar}>
                    <img src={closeIcon} alt="close icon" />
                </button>
                {children}
            </div>
        );
    }
};

export default Modal;
