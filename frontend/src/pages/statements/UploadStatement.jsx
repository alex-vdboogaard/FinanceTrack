import Modal from "../../components/modal/Modal";
import { useState, useRef } from "react";
import Button from "../../components/button/Button";

export default function UploadStatement({ folderId = null }) {
    const [modalOpen, setModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const toggleModal = () => setModalOpen((prev) => !prev);

    return (
        <>
            <Button
                className="primary-btn"
                onClick={() => setModalOpen(!modalOpen)}
            >
                + Upload
            </Button>
            <Modal
                isOpen={modalOpen}
                toggleSidebar={toggleModal}
                type={"center"}
            >
                <h2 className="h2">Upload statement</h2>
                <form
                    action="http://localhost:3001/statements"
                    method="POST"
                    encType="multipart/form-data"
                >
                    <input
                        className="normal-input"
                        type="file"
                        name="pdf"
                        required
                        ref={fileInputRef}
                        multiple // Allows multiple files to be selected
                    />

                    <input
                        type="text"
                        hidden
                        name="parent_folder_id"
                        defaultValue={folderId || ""} // Use defaultValue instead of value
                    />
                    <Button
                        className="secondary-btn"
                        type="button"
                        onClick={toggleModal}
                    >
                        Cancel
                    </Button>
                    <Button className="primary-btn" type="submit">
                        Upload
                    </Button>
                </form>
            </Modal>
        </>
    );
}
