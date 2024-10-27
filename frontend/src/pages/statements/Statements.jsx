import React, { useState, useRef } from "react";
import "./Statements.css";

const Statements = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        handleFile(file);
    };

    const handleFile = (file) => {
        if (file && file.type === "application/pdf") {
            const url = URL.createObjectURL(file);
            setPdfUrl(url);
            setError(null);
        } else {
            setPdfUrl(null);
            setError("Please select a valid PDF file.");
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const file = event.dataTransfer.files[0];
        handleFile(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
    };

    return (
        <div className="pdf-viewer-container">
            <div
                className={`dropzone ${isDragging ? "dragging" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    ref={fileInputRef}
                />

                {/* Upload Icon */}
                <div className="upload-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                    </svg>
                </div>

                <p className="upload-text">
                    Click to select or drag and drop a PDF file here
                </p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {pdfUrl && (
                <div className="pdf-container">
                    <iframe
                        src={pdfUrl}
                        className="pdf-iframe"
                        title="PDF Viewer"
                    />
                </div>
            )}
        </div>
    );
};

export default Statements;
