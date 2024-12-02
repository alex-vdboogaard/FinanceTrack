import Modal from "../../../components/modal/Modal";
import Button from "../../../components/button/Button";
import { useEffect, useState } from "react";
import { fetchData } from "../../../utility/fetchData";

export default function NewFolder({ parentFolderId = null, rerender }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [selectedTag, setSelectedTag] = useState("");
    const [tags, setTags] = useState([]);
    const toggleModal = () => setModalOpen((prev) => !prev);

    useEffect(() => {
        fetchData("http://localhost:3001/statements/tag").then((data) => {
            setTags(data.tags);
        });
    }, []);

    const handleChange = (event) => {
        setSelectedTag(event.target.value); // Update selected value
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            parentFolderId: parentFolderId,
            tag_id: selectedTag,
        };

        fetchData(
            "http://localhost:3001/statements/folder",
            "POST",
            formData
        ).then((successData) => {
            toggleModal();
            rerender();
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
                    <div className="inputWrapper">
                        <label style={{ display: "block" }} htmlFor="tag_id">
                            Tag
                        </label>
                        <select
                            name="tag_id"
                            id="tag_id"
                            className="normal-input"
                            value={selectedTag} // Bind state to value
                            onChange={handleChange} // Handle change event
                        >
                            <option value="">Select</option>{" "}
                            {/* Default option */}
                            {tags &&
                                tags.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <Button
                        className="primary-btn"
                        type="submit"
                        onClick={handleSubmit}
                        styles={{ marginTop: "20px" }}
                    >
                        Create
                    </Button>
                </form>
            </Modal>
        </>
    );
}
