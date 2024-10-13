import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import "./Assets.css";
import pops from "pop-message";
import "../../../node_modules/pop-message/pop.css";

export default function NewAsset({ onAssetCreated }) {
    const [assetTypes, setAssetTypes] = useState([]);
    const [name, setName] = useState("");
    const [boughtFor, setBoughtFor] = useState(0);
    const [selectedType, setSelectedType] = useState(""); // Change to string for easier handling
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3001/assets/asset-types`)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setAssetTypes(data.types);
            })
            .catch((error) => {
                pops.simplePop("error", error);
            });
    }, []);

    const handleNewAsset = (e) => {
        e.preventDefault();
        const newAssetData = {
            name: name,
            boughtFor: Number(boughtFor), // Ensure this is a number
            currentValue: Number(currentValue), // Ensure this is a number
            type: selectedType
        };

        fetch(`http://localhost:3001/assets`, {
            method: "POST",
            body: JSON.stringify(newAssetData),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((errorData) => {
                        console.error("Error data:", errorData);
                        pops.simplePop("error", errorData.message || "Network error");
                        throw new Error(errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((successData) => {
                pops.simplePop("success", successData.message);
                onAssetCreated();
            })
            .catch((error) => {
                console.error("Catch error:", error);
                pops.simplePop("error", error.message || "An unexpected error occurred");
            });
    };

    return (
        <div className="new-asset">
            <h2>New Asset</h2>
            <form onSubmit={handleNewAsset}>
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="normal-input"
                        required
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="boughtFor">Bought for</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="boughtFor"
                        id="boughtFor"
                        value={boughtFor}
                        onChange={(e) => setBoughtFor(e.target.value)} // Optionally parse to Number here
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="currentValue">Current value</label>
                    <input
                        className="normal-input"
                        type="number"
                        required
                        name="currentValue"
                        id="currentValue"
                        value={currentValue}
                        onChange={(e) => setCurrentValue(e.target.value)} // Optionally parse to Number here
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="type">Type</label>
                    <select
                        className="normal-input"
                        name="assetType"
                        required
                        id="type"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Select</option>
                        {assetTypes.map((type, index) => (
                            <option key={index} value={type.id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button className="primary-btn" type="submit">Create</Button>
            </form>
        </div>
    );
}
