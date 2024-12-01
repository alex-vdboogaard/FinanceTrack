import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import { useState } from "react";
import { fetchData } from "../../utility/fetchData";
import pops from "pop-message";

export default function NewFolder({ parentFolderId = null }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const toggleModal = () => setModalOpen((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            parentFolderId: parentFolderId,
        };
        fetchData(
            "http://localhost:3001/statements/folder",
            "POST",
            formData
        ).then((successData) => {
            toggleModal();
            pops.simplePop("success", successData);
        });
    };
    return (
        <>
            <Button
                className="secondary-btn"
                onClick={() => setModalOpen(!modalOpen)}
            >
                <strong>+</strong>
            </Button>
            <Modal
                isOpen={modalOpen}
                toggleSidebar={toggleModal}
                key={"folder"}
            >
                <h2 className="h2">New folder</h2>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="normal-input"
                            required
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <Button
                        className="primary-btn"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Create
                    </Button>
                </form>
            </Modal>
        </>
    );
}
