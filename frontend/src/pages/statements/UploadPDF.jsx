import React, { useState } from "react";
import { fetchData } from "../../utility/fetchData";

export default function UploadPDF() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            setUploadStatus("Please select a PDF file.");
            return;
        }

        const formData = new FormData();
        formData.append("pdf", selectedFile);

        fetchData("http://localhost:3001/statements", "POST", formData).then(
            (successData) => {
                setUploadStatus("PDF uploaded successfully!");
                setSelectedFile(null);
            }
        );
    };

    return (
        <div style={{ margin: "20px" }}>
            <h2>Upload PDF</h2>
            <form onSubmit={handleUpload}>
                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit" style={{ marginLeft: "10px" }}>
                    Upload
                </button>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
}
