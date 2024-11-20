import React, { useState, useEffect } from "react";
import "./Statements.css";
import { fetchData } from "../../utility/fetchData.js";
import UploadStatement from "./uploadStatement.jsx";
import NewFolder from "./NewFolder.jsx";
import Folders from "./Folders.jsx";
import { useParams } from "react-router-dom";

export default function FolderPage() {
    const exampleFolder = {
        name: "2024 statements",
        folders: [],
        statements: [
            {
                id: 1,
                filename: "Statement 1",
                pdf_blob: "base64encodedPdf1",
                createdAt: "2022-01-01",
            },
            {
                id: 2,
                filename: "Statement 2",
                pdf_blob: "base64encodedPdf2",
                createdAt: "2022-01-02",
            },
        ],
    };

    const { id } = useParams();
    const [folder, setFolder] = useState(exampleFolder);

    // useEffect(() => {
    //     fetchData(`http://localhost:3001/statements/folder/${id}`).then(
    //         (data) => setFolder(data.folder)
    //     );
    // }, []);

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
            <h1>{folder.name}</h1>

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">Folders</h2>
                <NewFolder></NewFolder>
            </div>

            <Folders folders={folder.folders}></Folders>

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">Files</h2>
                <UploadStatement />
            </div>

            <table className="statements-table">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {folder.statements.map((statement) => (
                        <tr key={statement.id}>
                            <td className="file-td">
                                <img
                                    src="../src/assets/folder.svg"
                                    alt="file icon"
                                />
                                {statement.filename}
                            </td>
                            <td>
                                <button
                                    onClick={() =>
                                        handlePreview(statement.base64Pdf)
                                    }
                                >
                                    <img
                                        src="../src/assets/folder.svg"
                                        alt="preview"
                                    />
                                </button>
                                <button
                                    onClick={() => handleDelete(statement.id)}
                                >
                                    <img
                                        src="../src/assets/folder.svg"
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
