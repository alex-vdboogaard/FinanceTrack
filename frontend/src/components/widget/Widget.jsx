import "./Widget.css";

export default function Widget({
  width,
  maxHeight = "500px",
  height = "none",
  children,
}) {
  return (
    <div
      className="widget"
      style={{
        maxHeight: maxHeight,
        width: width,
        height: height ? height : "100%",
      }}
    >
      {children}
    </div>
  );
}
