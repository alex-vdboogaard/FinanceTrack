import React, { useState, useEffect } from "react";
import { fetchData } from "../../utility/fetchData";

export default function Statements() {
    const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
        fetchData("http://localhost:3001/statements").then((data) =>
            setPdfFiles(data.statements)
        );
    }, []);

    return (
        <main>
            <h1>Statements</h1>
            {!pdfFiles.length && <p>No statements yet.</p>}
            {pdfFiles.map((pdf, index) => (
                <PdfViewer key={index} pdf={pdf.path} name={pdf.name} />
            ))}
        </main>
    );
}

function PdfViewer({ pdf, name }) {
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
                    title={name}
                    style={{ width: "100%", height: "80vh", border: "none" }}
                />
            )}
        </div>
    );
}
