import { useState } from "react";
import "./ToolTip.css";

export default function ToolTip({ icon, children }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The icon or element triggering the tooltip */}
            <img src={icon} alt="tooltip icon" />

            {/* Tooltip that appears on hover */}
            {isHovered && <div className="tool-tip">{children}</div>}
        </div>
    );
}
