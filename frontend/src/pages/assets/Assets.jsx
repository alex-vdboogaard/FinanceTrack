import { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import NewAsset from "./NewAsset";
import AssetPieChart from "./AssetPieChart";
import "./Assets.css";
import "../../../node_modules/pop-message/pop.css";
import pops from "pop-message";
import AssetBarChart from "./AssetBarChart";
import { fetchData } from "../../utility/fetchData";

export default function Assets() {
    const [assets, setAssets] = useState([]);
    const [count, setCount] = useState(0);
    const [totalBoughtFor, setTotalBoughtFor] = useState(0);
    const [totalCurrentValue, setTotalCurrentValue] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [triggerRerender, setTriggerRerender] = useState(false);
    const url = "http://localhost:3001/assets";

    const calculateTotals = (assets) => {
        const totalBought = assets.reduce((acc, asset) => acc + parseFloat(asset.boughtFor), 0);
        const totalCurrent = assets.reduce((acc, asset) => acc + parseFloat(asset.currentValue), 0);
        setTotalBoughtFor(totalBought);
        setTotalCurrentValue(totalCurrent);
    };
    const handleRerender = () => {
        setTriggerRerender(prev => !prev);
    };

    useEffect(() => {
        fetchData(url)
            .then((data) => {
                setAssets(data.assets);
                setCount(data.assets.length);
                calculateTotals(data.assets);
            })
            .catch((error) => {
                console.log("Error fetching assets: ", error);
            });
    }, [triggerRerender]);

    const handleSave = (asset) => {
        fetchData(url, 'PUT', asset);
    };

    const handleDelete = async (asset) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${asset.name}'?`);
        if (confirm) {
            fetchData(url, 'DELETE', { id: asset.id, userId: asset.userId })
                .then(() => {
                    const updatedAssets = assets.filter(a => a.id !== asset.id);
                    setAssets(updatedAssets);
                    setCount(prevCount => prevCount - 1);
                    calculateTotals(updatedAssets);
                    pops.simplePop("success", "Asset deleted");
                });
        }
    };

    const newAsset = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleUpdate = (index, field, value) => {
        const updatedAssets = [...assets];
        updatedAssets[index][field] = value;
        setAssets(updatedAssets);
        calculateTotals(updatedAssets);
    };

    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "20px" }}>Physical assets</h1>
                <Button onClick={newAsset} className="primary-btn">+ New asset</Button>
            </div>

            <Modal isOpen={isSidebarOpen} toggleSidebar={newAsset}>
                <NewAsset onAssetCreated={handleRerender} />
            </Modal>

            <table>
                <thead>
                    <tr className="no-border">
                        <th>Name</th>
                        <th>Type</th>
                        <th>Bought for (R)</th>
                        <th>Current value (R)</th>
                        <th>Growth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={asset.name}
                                    onChange={(e) => handleUpdate(index, 'name', e.target.value, asset)}
                                    onBlur={(e) => handleSave(asset)}
                                />
                            </td>
                            <td>
                                {asset.assetType}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={asset.boughtFor}
                                    onChange={(e) => handleUpdate(index, 'boughtFor', parseFloat(e.target.value), asset)}
                                    onBlur={() => handleSave(asset)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={asset.currentValue}
                                    onChange={(e) => handleUpdate(index, 'currentValue', parseFloat(e.target.value), asset)}
                                    onBlur={() => handleSave(asset)}
                                />
                            </td>
                            <td
                                style={{
                                    color: ((asset.currentValue - asset.boughtFor) / asset.boughtFor) * 100 >= 0 ? 'green' : 'red'
                                }}
                            >
                                {(Math.round(((asset.currentValue - asset.boughtFor) / asset.boughtFor) * 100 * 100) / 100).toFixed(2) + '%'}
                            </td>
                            <td className="delete-icon">
                                <button onClick={() => handleDelete(asset)}><img src="../src/assets/delete.svg" /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Count: {count}</td>
                        <td>Total: R{totalBoughtFor}</td>
                        <td>Total: R{totalCurrentValue}</td>
                        {assets.length > 0 ? (
                            <td colSpan="2">
                                Total: {((totalCurrentValue - totalBoughtFor) / totalBoughtFor * 100).toFixed(2)}%
                            </td>
                        ) : <td colSpan="2">Total: 0</td>}
                    </tr>
                </tfoot>
            </table>
            <div style={{ marginTop: "50px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
                {assets.length > 0 ? (
                    <>
                        <AssetPieChart assets={assets} />
                        <AssetBarChart assets={assets} />
                    </>
                ) : (
                    <></>
                )}
            </div>
        </main>
    );
}

