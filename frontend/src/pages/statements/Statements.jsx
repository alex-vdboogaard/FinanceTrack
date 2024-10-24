import React, { useState, useEffect } from "react";

export default function Statements() {
    const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
        fetch("/pdfFiles.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => setPdfFiles(data.files))
            .catch((error) =>
                console.error("Error fetching PDF files:", error)
            );
    }, []);

    return (
        <main>
            <h1>Statements</h1>
            {!pdfFiles.length && <p>No statements yet.</p>}
            {pdfFiles.map((pdf, index) => (
                <PdfViewer key={index} pdf={pdf} />
            ))}
        </main>
    );
}

function PdfViewer({ pdf }) {
    const [isMinimized, setIsMinimized] = useState(true);

    return (
        <div style={{ margin: "10px", width: "80%" }}>
            <h3
                style={{ cursor: "pointer", marginBottom: "20px" }}
                onClick={() => setIsMinimized(!isMinimized)}
            >
                {pdf}
            </h3>
            {!isMinimized && (
                <iframe
                    src={`/${pdf}`}
                    title={pdf}
                    style={{ width: "100%", height: "80vh", border: "none" }}
                />
            )}
        </div>
    );
}
