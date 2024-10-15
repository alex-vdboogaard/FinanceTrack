import "./Home.css"
export default function InvestmentDiv({ investment }) {
    const handleClick = () => {
        window.location.href = "/investments";
    }
    return (
        <div onClick={handleClick} className="investment-div">
            <p className="investment-description">{investment.description}</p>
            <p className="investment-balance">R{investment.currentValue}</p>
            <img src="../src/assets/arrow-right.svg" alt="arrow icon" className="investment-arrow" />
        </div>
    )
}