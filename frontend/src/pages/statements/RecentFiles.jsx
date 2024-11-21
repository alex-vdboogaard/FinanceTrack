import { useEffect, useState } from "react";
import { fetchData } from "../../utility/fetchData";
import { getFileSizeFromBase64 } from "../../utility/fileSize";

export default function RecentFiles({ triggerRerender }) {
    const exampleFiles = [
        {
            id: "1",
            name: "October credit card",
            createdAt: "24 October 2024",
            pdf_blob:
                "JVBERi0xLjcKCjQgMCBvYmoKPDwKL0JpdHNQZXJDb21wb25lbnQgOAovQ29sb3JTcGFjZSAvRGV2aWNlUkdCCi9GaWx0ZXIgL0RDVERlY29kZQovSGVpZ2h0IDM1MDcKL0xlbmd0aCA3NzY3NTAKL1N1YnR5cGUgL0ltYWdlCi9UeXBlIC9YT2JqZWN0Ci9XaWR0aCAyNDc5Cj4+CnN0cmVhbQr/2P/gABBKRklGAAEBAQBgAGAAAP/bAEMADQkKCwoIDQsLCw8ODRAUIRUUEhIUKB0eGCEwKjIxLyouLTQ7S0A0OEc5LS5CWUJHTlBUVVQzP11jXFJiS1NUUf/bAEMBDg8PFBEUJxUVJ1E2LjZRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUf/AABEIDbMJrwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEi",
        },
        {
            id: "2",
            name: "September to January 2024",
            createdAt: "24 September 2024",
            pdf_blob:
                "JVBERi0xLjcKCjQgMCBvYmoKPDwKL0JpdHNQZXJDb21wb25lbnQgOAovQ29sb3JTcGFjZSAvRGV2aWNlUkdCCi9GaWx0ZXIgL0RDVERlY29kZQovSGVpZ2h0IDM1MDcKL0xlbmd0aCA3NzY3NTAKL1N1YnR5cGUgL0ltYWdlCi9UeXBlIC9YT2JqZWN0Ci9XaWR0aCAyNDc5Cj4+CnN0cmVhbQr/2P/gABBKRklGAAEBAQBgAGAAAP/bAEMADQkKCwoIDQsLCw8ODRAUIRUUEhIUKB0eGCEwKjIxLyouLTQ7S0A0OEc5LS5CWUJHTlBUVVQzP11jXFJiS1NUUf/bAEMBDg8PFBEUJxUVJ1E2LjZRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUf/AABEIDbMJrwMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEi",
        },
        {
            id: "3",
            name: "February to August 2024",
            createdAt: "24 February 2024",
            pdf_blob: "asdasdasd",
        },
        {
            id: "4",
            name: "July to November 2024",
            createdAt: "24 July 2024",
            pdf_blob: "asdasdasd",
        },
        {
            id: "5",
            name: "2024",
            createdAt: "24 January 2024",
            pdf_blob: "asdasdasd",
        },
    ];
    const [files, setFiles] = useState(exampleFiles);

    // useEffect(() => {
    //     fetchData("localhost:3001/statements/recent").then((successData) => {
    //         setFiles(successData.statements);
    //     });
    // }, [triggerRerender]);

    return (
        <div>
            <h2 className="h2">Recent</h2>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: "40px",
                }}
            >
                {files.map((file) => (
                    <div className="recent-file" key={file.id}>
                        <img src="./src/assets/file.svg" alt="file icon" />
                        <div>
                            <h3 className="folder-heading file-heading">
                                {file.name}
                            </h3>
                            <p>
                                {file.createdAt} -{" "}
                                {getFileSizeFromBase64(file.pdf_blob)} MB
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
