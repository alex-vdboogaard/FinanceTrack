import "./Widget.css"

export default function Widget({ width, maxHeight, children }) {
    return (
        <div className="widget" style={{ maxHeight: maxHeight, width: width }}>
            {children}
        </div>
    )
}
