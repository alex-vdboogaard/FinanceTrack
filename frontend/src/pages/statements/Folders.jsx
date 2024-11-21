import { sumFileSize } from "../../utility/fileSize";
import { useNavigate } from "react-router-dom";

export default function Folders({ folders = [] }) {
    const navigate = useNavigate();

    const openFolder = (id) => {
        navigate(`/statements/folder/${id}`);
    };

    return (
        <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "40px" }}
        >
            {folders.map((folder) => (
                <div
                    className="folder"
                    key={folder.id}
                    onClick={() => openFolder(folder.id)}
                >
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
