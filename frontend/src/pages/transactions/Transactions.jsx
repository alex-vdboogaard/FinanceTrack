import Button from '../../components/button/Button'
export default function Transactions() {
    return (
        <main>
            <h1>Transactions</h1>
            <Button onClick={() => alert("Hi!")} className='primary-btn'>+ Add new asset</Button>
        </main>

    )
}