import "./Widget.css";

export default function Widget({ width, maxHeight = "500px", children }) {
    return (
        <div
            className="widget"
            style={{ maxHeight: maxHeight, width: width, height: "100%" }}
        >
            {children}
        </div>
    );
}
