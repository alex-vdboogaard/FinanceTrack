import React, { useState, useRef, useEffect } from "react";
import "./Statements.css";
import { fetchData } from "../../utility/fetchData";

const Statements = () => {
    const [statements, setStatements] = useState([]);
    const fileInputRef = useRef(null);

    // Fetch PDF statements on component mount
    useEffect(() => {
        fetchData("http://localhost:3001/statements").then((data) =>
            setStatements(data.statements)
        );
    }, []);

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

    const handleDelete = (id) => {
        fetchData(`http://localhost:3001/statements`, "DELETE", { id }).then(
            (successData) => {
                setStatements((prevStatements) =>
                    prevStatements.filter((statement) => statement.id !== id)
                );
            }
        );
    };

    return (
        <main>
            <form
                action="http://localhost:3001/statements"
                method="POST"
                encType="multipart/form-data"
            >
                <input type="file" name="pdf" ref={fileInputRef} />
                <button type="submit">Upload</button>
            </form>
            <table className="statements-table">
                <thead>
                    <tr>
                        <th>Filename</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {statements.map((statement) => (
                        <tr key={statement.id}>
                            <td>{statement.filename}</td>
                            <td>
                                <button
                                    onClick={() =>
                                        handlePreview(statement.base64Pdf)
                                    }
                                >
                                    <img
                                        src="../src/assets/view.svg"
                                        alt="preview"
                                    />
                                </button>
                                <button
                                    onClick={() => handleDelete(statement.id)}
                                >
                                    <img
                                        src="../src/assets/delete.svg"
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
};

export default Statements;
