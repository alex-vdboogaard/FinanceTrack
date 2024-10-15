import "./Home.css"
export default function AssetDiv({ asset }) {
    const handleClick = () => {
        window.location.href = "/assets";
    }
    return (
        <div onClick={handleClick} className="asset-div">
            <p className="asset-name">{asset.name}</p>
            <p
                className="asset-value"
                style={{ color: asset.currentValue > 0 ? 'green' : 'red' }}
            >
                R{asset.currentValue}
            </p>
        </div>
    )
}