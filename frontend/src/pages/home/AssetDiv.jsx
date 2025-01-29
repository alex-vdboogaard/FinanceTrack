import "./Home.css";
export default function AssetDiv({ asset }) {
  const handleClick = () => {
    window.location.href = "/assets";
  };
  return (
    <div onClick={handleClick} className="bank-account-div">
      <p className="bank-account-name">{asset.name}</p>
      <p
        className="bank-account-balance"
        style={{ color: asset.currentValue > 0 ? "green" : "red" }}
      >
        R{asset.currentValue}
      </p>
    </div>
  );
}
