import "./Home.css"
export default function BankAccountDiv({ account }) {
    const handleClick = () => {
        window.location.href = "/bank-accounts";
    }
    return (
        <div onClick={handleClick} className="bank-account-div">
            <p className="bank-account-name">{account.name}</p>
            <p
                className="bank-account-balance"
                style={{ color: account.balance > 0 ? 'green' : 'red' }}
            >
                R{account.balance}
            </p>
        </div>
    )
}