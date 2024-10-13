import { useEffect, useState } from "react"
import "./Assets.css"
import pops from "pop-message"
import "../../../node_modules/pop-message/pop.css";

export default function NewAsset() {
    const [assetTypes, setAssetTypes] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/assets/asset-types`)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setAssetTypes(data.types);
            })
            .catch((error) => {
                pops.simplePop("error", error)
            });
    })
    return (
        <div className="new-asset">
            <h2>New Asset</h2>
            <form>
                <div className="input-wrapper">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="normal-input" name="name" id="name" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="boughtFor">Bought for</label>
                    <input className="normal-input" type="text" name="boughtFor" id="boughtFor" />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="type">Type</label>
                    <select className="normal-input" name="assetType" required id="type">
                        <option value=""></option>
                        {assetTypes.map((type, index) =>
                        (
                            <option key={index} value={type.id}>{type.name}</option>
                        )
                        )}
                    </select>
                </div>
            </form >
        </div >

    )
}