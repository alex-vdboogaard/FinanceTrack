import Modal from "../../components/modal/Modal";
import { useState, useRef } from "react";
import Button from "../../components/button/Button";

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
                        ref={fileInputRef}
                    />
                    <div
                        style={{ marginTop: "30px" }}
                        className="input-wrapper"
                    >
                        <label htmlFor="folder">Folder</label>
                        <select
                            name="folder"
                            id="folder"
                            className="normal-input"
                        >
                            Folder
                            <option style={{ padding: "10px" }} value="">
                                Folder 1
                            </option>
                        </select>
                    </div>
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
