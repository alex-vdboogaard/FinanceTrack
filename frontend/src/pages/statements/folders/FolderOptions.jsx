import { confirmPop, inputPop, simplePop } from "pop-message";
import { fetchData } from "../../../utility/fetchData";
import editIcon from "../../../assets/edit.svg";
import deleteIcon from "../../../assets/delete.svg";

export default function FolderOptions({ id, parent_folder_id }) {
    const handleDelete = async () => {
        const confirm = await confirmPop(
            "Are you sure you want to delete this folder and all its files?"
        );
        if (confirm) {
            fetchData(
                `http://localhost:3001/statements/folder/${id}`,
                "DELETE",
                parent_folder_id
            );
        }
    };

    const handleEdit = async () => {
        const name = await inputPop("New folder name");
        const formData = {
            name,
            parent_folder_id,
        };
        if (name) {
            fetchData(
                `http://localhost:3001/statements/folder/${id}`,
                "PUT",
                formData
            );
        }
    };
    return (
        <>
            <div
                onClick={() => {
                    handleEdit();
                }}
                className="folder-options-wrapper"
            >
                <img src={editIcon} alt="edit icon" />
                <p>Edit</p>
            </div>
            <div
                onClick={() => {
                    handleDelete();
                }}
                className="folder-options-wrapper"
            >
                <img src={deleteIcon} alt="edit icon" />
                <p>Delete</p>
            </div>
        </>
    );
}
