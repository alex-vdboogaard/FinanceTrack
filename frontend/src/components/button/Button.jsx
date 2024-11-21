import React from "react";
import "./Button.css"; // For styling

const Button = ({
    type = "button",
    onClick = () => {},
    children,
    className = "",
    disabled = false,
    styles = {},
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${className}`}
            disabled={disabled}
            style={styles}
        >
            {children}
        </button>
    );
};

export default Button;
