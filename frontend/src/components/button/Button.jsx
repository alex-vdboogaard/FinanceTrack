import React from "react";
import "./Button.css"; // For styling
import bubbleArrow from "../../assets/bubble-arrow.svg";

const Button = ({
    type = "button",
    onClick = () => {},
    children,
    className = "",
    disabled = false,
    styles = {},
}) => {
    return type === "back" ? (
        <button className="back" onClick={onClick}>
            <img src={bubbleArrow} alt="back icon" />
        </button>
    ) : (
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
