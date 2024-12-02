import { sumFileSize } from "../../../utility/fileSize";
import { useNavigate } from "react-router-dom";
import folderIcon from "../../../assets/folder.svg";
import ToolTip from "../../../components/tooltip/ToolTip";
import optionsIcon from "../../../assets/options.svg";
import FolderOptions from "./FolderOptions";

export default function Folders({ folders = [], rerender = () => {} }) {
    const navigate = useNavigate();

    const openFolder = (id) => {
        navigate(`/statements/folder/${id}`);
    };

    return (
        <div
            style={{ display: "flex", flexWrap: "wrap", marginBottom: "40px" }}
        >
            {folders.map((folder) => (
                <div className="folder" key={folder.id}>
                    <ToolTip icon={optionsIcon}>
                        <FolderOptions
                            id={folder.id}
                            rerender={rerender}
                        ></FolderOptions>
                    </ToolTip>
                    <img src={folderIcon} alt="folder icon" />
                    <h3
                        onClick={() => openFolder(folder.id)}
                        className="folder-heading"
                    >
                        {folder.name}
                    </h3>
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
