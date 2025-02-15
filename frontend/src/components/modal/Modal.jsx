import React from "react";
import "./Modal.css";
import closeIcon from "../../assets/close.svg";
import { useEffect } from "react";

const Modal = ({
  isOpen,
  toggleSidebar,
  children,
  type = null,
  styles = null,
}) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        toggleSidebar();
      }
    };

    // Add event listener when the modal is open
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    // Cleanup event listener when the modal is closed or unmounted
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, toggleSidebar]);

  if (type === "center") {
    return (
      <div style={styles} className={`center-modal ${isOpen ? "open" : ""}`}>
        <button className="modal-toggle-right" onClick={toggleSidebar}>
          <img src={closeIcon} alt="close icon" />
        </button>
        {children}
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
