import React, { useState, useEffect } from "react";
import "./Statements.css";
import { fetchData } from "../../utility/fetchData";
import pops from "../../../node_modules/pop-message/index.js";
import "../../../node_modules/pop-message/pop.css";
import UploadStatement from "./UploadStatement.jsx";
import NewFolder from "./NewFolder.jsx";
import Folders from "./Folders.jsx";

// import RecentFiles from "./RecentFiles.jsx";
// import Pagination from "../../components/pagination/Pagination.jsx";

const Statements = () => {
    const [folders, setFolders] = useState([]);
    const [statements, setStatements] = useState([]);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [numPages, setNumPages] = useState(1);

    // const handlePageChange = (page) => {
    //     setCurrentPage(page);
    // };
    // Fetch PDF statements on component mount
    useEffect(() => {
        fetchData(`http://localhost:3001/statements`).then((data) => {
            setStatements(data.statements);
            setFolders(data.folders);
        });
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
            <h1>Statements</h1>

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">Folders</h2>
                <NewFolder></NewFolder>
            </div>

            <Folders folders={folders}></Folders>

            {/* <RecentFiles /> */}

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">All files</h2>
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
                    {statements &&
                        statements.map((statement) => (
                            <tr key={statement.id}>
                                <td>
                                    <div className="file-td">
                                        <img
                                            className="file-icon"
                                            src="./src/assets/file.svg"
                                            alt="file icon"
                                        />
                                        {statement.name}
                                    </div>
                                </td>
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
                                        onClick={() =>
                                            handleDelete(statement.id)
                                        }
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

            {/* {numPages > 1 && (
                <Pagination
                    numPages={numPages}
                    handleChange={handlePageChange}
                    activePage={currentPage}
                />
            )} */}
        </main>
    );
};

export default Statements;
