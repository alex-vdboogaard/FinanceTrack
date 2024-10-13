import { useEffect, useState } from "react";

export default function Assets() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/assets/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setAssets(data.assets);
            })
            .catch((error) => {
                console.log("Error: ", error)
            });
    }, []);

    return (
        <main>
            <h1>Assets</h1>
            <ul>
                {assets.map((asset, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {asset.name} <br />
                        <strong>Bought For:</strong> {asset.boughtFor} <br />
                        <strong>Current Value:</strong> {asset.currentValue} <br />
                        <strong>Asset Type:</strong> {asset.assetType} <br />
                    </li>
                ))}
            </ul>
        </main>
    );
}
