import { sumFileSize } from "../../utility/fileSize";

export default function Folders({ folders = [] }) {
    return (
        <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "40px" }}
        >
            {folders.map((folder) => (
                <div className="folder" key={folder.id}>
                    <img src="./src/assets/folder.svg" alt="folder icon" />
                    <h3 className="folder-heading">{folder.name}</h3>
                    <p>
                        {folder.statements?.length || 0} files -{" "}
                        {folder.statements
                            ? sumFileSize(folder.statements).toFixed(2)
                            : "0"}{" "}
                        MB
                    </p>
                </div>
            ))}
        </div>
    );
}
