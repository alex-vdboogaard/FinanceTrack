import React, { useState, useEffect } from "react";
import "./Statements.css";
import { fetchData } from "../../utility/fetchData";
import pops from "../../../node_modules/pop-message/index.js";
import "../../../node_modules/pop-message/pop.css";
import UploadStatement from "./UploadStatement.jsx";
import NewFolder from "./folders/NewFolder.jsx";
import Folders from "./folders/Folders.jsx";
import RecentFiles from "./RecentFiles.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import StatementsList from "./StatementsList.jsx";

const Statements = () => {
    // State for files and folder data
    const [folders, setFolders] = useState([]);
    const [statements, setStatements] = useState([]);
    const [recentFiles, setRecentFiles] = useState([]);

    // Rerender states for each section
    const [rerender, setRerender] = useState({
        statements: false,
        folders: false,
        recentFiles: false,
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(1);

    // Combined loading state object
    const [loading, setLoading] = useState({
        statements: true,
        folders: true,
        recentFiles: true,
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        setLoading((prev) => ({ ...prev, statements: true }));
        fetchData(`http://localhost:3001/statements?page=${currentPage}`).then(
            (data) => {
                setLoading((prev) => ({ ...prev, statements: false }));
                setStatements(data.statements);
                setNumPages(data.totalPages);
                setCurrentPage(data.currentPage);
            }
        );
    }, [currentPage, rerender.statements]);

    useEffect(() => {
        setLoading((prev) => ({ ...prev, folders: true }));
        fetchData(`http://localhost:3001/statements/folders`).then((data) => {
            setLoading((prev) => ({ ...prev, folders: false }));
            setFolders(data.folders);
        });
    }, [rerender.folders]);

    useEffect(() => {
        setLoading((prev) => ({ ...prev, recentFiles: true }));
        fetchData(`http://localhost:3001/statements/recent-files`).then(
            (data) => {
                setLoading((prev) => ({ ...prev, recentFiles: false }));
                setRecentFiles(data.recentFiles);
            }
        );
    }, [rerender.recentFiles]);

    // Handle PDF preview
    const handlePreview = (pdfBuffer) => {
        try {
            const uint8Array = new Uint8Array(pdfBuffer.data);
            const blob = new Blob([uint8Array], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const newTab = window.open(url, "_blank");
            if (newTab) {
                newTab.onload = () => {
                    URL.revokeObjectURL(url);
                };
            }
        } catch (error) {
            console.error("Error opening PDF preview:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirm = await pops.confirmPop(
            "Are you sure you want to delete this file?"
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

    const handleRerender = (section) => {
        if (section === "all") {
            // Toggle all sections
            setRerender((prev) => {
                const newRerender = {};
                for (const key in prev) {
                    newRerender[key] = !prev[key];
                }
                return newRerender;
            });
        } else {
            // Toggle specific section
            setRerender((prev) => ({ ...prev, [section]: !prev[section] }));
        }
    };

    return (
        <main>
            <h1>Statements</h1>

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">Folders</h2>
                <NewFolder
                    rerender={() => handleRerender("folders")}
                ></NewFolder>
            </div>

            <Folders
                folders={folders}
                rerender={() => handleRerender("all")}
                loading={loading.folders}
            ></Folders>

            <RecentFiles
                preview={handlePreview}
                statements={recentFiles}
                loading={loading.recentFiles}
            />

            <div style={{ display: "flex", alignItems: "center" }}>
                <h2 className="h2">All files</h2>
                <UploadStatement />
            </div>

            <StatementsList statements={statements} loading={loading}></StatementsList>

            {numPages > 1 && (
                <Pagination
                    numPages={numPages}
                    handleChange={handlePageChange}
                    activePage={currentPage}
                />
            )}
        </main>
    );
};

export default Statements;
