import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import { useState, useRef } from "react";

export default function UploadStatement() {
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
            <Modal isOpen={modalOpen} toggleSidebar={toggleModal}>
                <form
                    action="http://localhost:3001/statements"
                    method="POST"
                    encType="multipart/form-data"
                >
                    <input type="file" name="pdf" ref={fileInputRef} />
                    <button type="submit">Upload</button>
                    <button type="button" onClick={toggleModal}>
                        Cancel
                    </button>
                </form>
            </Modal>
        </>
    );
}
