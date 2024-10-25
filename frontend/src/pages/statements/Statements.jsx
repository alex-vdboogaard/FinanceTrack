import React, { useState, useEffect } from "react";
import { fetchData } from "../../utility/fetchData";
import UploadPDF from "./UploadPDF";

export default function Statements() {
    const [pdfFiles, setPdfFiles] = useState([]);

    useEffect(() => {
        fetchData("http://localhost:3001/statements").then((data) => {
            setPdfFiles(data.statements);
        });
    }, []);

    return (
        <main>
            <h1>Statements</h1>
            <UploadPDF></UploadPDF>
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
                {pdf.filename}
            </h3>
            {!isMinimized && (
                <iframe
                    src={`data:application/pdf;base64,${pdf.base64Pdf}`}
                    title={pdf.filename}
                    style={{ width: "100%", height: "80vh", border: "none" }}
                />
            )}
        </div>
    );
}
