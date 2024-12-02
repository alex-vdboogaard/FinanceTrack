import React, { useState, useEffect } from "react";
import "../Statements.css";
import { fetchData } from "../../../utility/fetchData.js";
import UploadStatement from "../UploadStatement.jsx";
import NewFolder from "./NewFolder.jsx";
import Folders from "./Folders.jsx";
import { useParams } from "react-router-dom";
import deleteIcon from "../../../assets/delete.svg";
import fileIcon from "../../../assets/file.svg";
import previewIcon from "../../../assets/view.svg";
import Button from "../../../components/button/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function FolderPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [folder, setFolder] = useState({});
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        fetchData(`http://localhost:3001/statements/folder/${id}`).then(
            (data) => setFolder(data)
        );
    }, [id, rerender]);

    const handleRerender = () => {
        setRerender((prev) => !prev);
    };
    // Handle PDF preview
    const handlePreview = (base64Pdf) => {
        // Create a blob from the base64 string and generate a URL
        const blob = new Blob(
            [Uint8Array.from(atob(base64Pdf), (c) => c.charCodeAt(0))],
            { type: "application/pdf" }
        );
        const url = URL.createObjectURL(blob);

        // Open the PDF in a new tab
        window.open(url, "_blank");
    };

    const handleDelete = async (id) => {
        const confirm = await pops.confirmPop(
            "Are you sure you want to delete?"
        );
        if (confirm) {
            fetchData(`http://localhost:3001/statements`, "DELETE", {
                id,
            }).then((successData) => {
                setStatements((prevStatements) =>
                    prevStatements.filter((statement) => statement.id !== id)
                );
            });
        }
    };

    return (
        <main>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                    type="back"
                    onClick={() => {
                        if (!folder.parent_folder_id) {
                            navigate("/statements");
                        } else {
                            navigate(
                                `/statements/folder/${folder.parent_folder_id}`
                            );
                        }
                    }}
                ></Button>
                <h1>{folder.folder_name}</h1>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">Folders</h2>
                <NewFolder
                    parentFolderId={id}
                    rerender={handleRerender}
                ></NewFolder>
            </div>

            <Folders
                rerender={handleRerender}
                folders={folder.folders}
            ></Folders>

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">Files</h2>
                <UploadStatement folderId={folder.folder_id} />
            </div>

            <table className="statements-table">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {folder.statements &&
                        folder.statements.map((statement) => (
                            <tr key={statement.id}>
                                <td>
                                    <div className="file-td">
                                        <img src={fileIcon} alt="file icon" />
                                        {statement.name}
                                    </div>
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            handlePreview(statement.base64Pdf)
                                        }
                                    >
                                        <img src={previewIcon} alt="preview" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleDelete(statement.id)
                                        }
                                    >
                                        <img
                                            src={deleteIcon}
                                            alt="delete icon"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </main>
    );
}
