import { useEffect, useState } from "react";
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal";
import NewAsset from "./NewAsset";
import "./Assets.css"
import "../../../node_modules/pop-message/pop.css"
import pops from "pop-message"

export default function Assets() {
    const [assets, setAssets] = useState([]);
    const [count, setCount] = useState(0);
    const [totalBoughtFor, setTotalBoughtFor] = useState(0);
    const [totalCurrentValue, setTotalCurrentValue] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [triggerRerender, setTriggerRerender] = useState(false);
    const handleRerender = () => {
        setTriggerRerender(prev => !prev);
    };

    useEffect(() => {
        fetch(`http://localhost:3001/assets/`)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
                return response.json();
            })
            .then((data) => {
                setAssets(data.assets);
                setCount(data.assets.length);
                // setTotalBoughtFor(data.assets.reduce((acc, asset) => acc + asset.boughtFor, 0));
                // setTotalCurrentValue(data.assets.reduce((acc, asset) => acc + asset.currentValue, 0));

            })
            .catch((error) => {
                console.log("Error: ", error)
            });
    }, [triggerRerender]);

    const handleSave = (asset) => {
        fetch(`http://localhost:3001/assets`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(asset),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errorData => {
                        pops.simplePop("error", errorData.message || "Network error");
                    });
                }
            })
            .catch(error => {
                pops.simplePop("error", `Error updating asset: ${error}`);
            });
    };

    const handleUpdate = (index, field, value) => {
        const updatedAssets = [...assets];
        updatedAssets[index][field] = value;
        setAssets(updatedAssets);
    };

    const handleDelete = async (asset) => {
        const confirm = await pops.confirmPop(`Are you sure you want to delete '${asset.name}'?`);
        if (confirm) {
            fetch(`http://localhost:3001/assets`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: asset.id,
                    userId: asset.userId
                }),
            })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errorData => {
                            pops.simplePop("error", errorData.message || "Network error");
                        });
                    }
                    return response.json().then(successData => {
                        setAssets(assets.filter(a => a.id !== asset.id));
                        setCount(prevCount => prevCount - 1);
                        pops.simplePop("success", successData.message);
                    });
                })
                .catch(error => {
                    pops.simplePop("error", `Error deleting asset: ${error}`);
                });
        }
    };

    const newAsset = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }
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
                            <td className="delete-icon">
                                <button onClick={() => handleDelete(asset)}><img src="../src/assets/delete.svg" /></button> {/* Action button to save */}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2">Count: {count}</td>
                        <td>Total: {totalBoughtFor}</td>
                        <td>Total: {totalCurrentValue}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </main >
    );
}
