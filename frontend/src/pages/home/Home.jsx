import Button from "../../components/button/Button"
export default function Home() {
    return (
        <main>
            <h1>Good morning, Alex</h1>
            <Button onClick={() => alert("Hi!")} className='primary-btn'>+ Add new asset</Button>
        </main>

    )
}