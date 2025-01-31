import Button from "../../../button/Button";
import { fetchData } from "../../../../utility/fetchData";
import { useState, useRef, useEffect } from "react";
import Modal from "../../../modal/Modal";
import { simplePop } from "pop-message";

export default function ProfilePhotoSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData("http://localhost:3001/user/profile-photo").then((response) => {
      setPhoto(response.image);
    });
  }, [refresh]);

  const handleNewProfilePhoto = async (e) => {
    const file = document.querySelector("#file-input").files[0];
    if (!file) {
      simplePop("error", "Please upload a photo");
      return;
    }
    const formData = new FormData();
    formData.append("png", file);

    try {
      const response = await fetch("http://localhost:3001/user/profile-photo", {
        method: "POST",
        body: formData,
        headers: {
          // Do NOT manually set "Content-Type" here, let the browser set it
        },
      });

      const data = await response.json();
      if (response.ok) {
        simplePop("success", data.message);
        handleRefresh();
      } else {
        simplePop("error", data.message);
      }
    } catch (e) {
      simplePop("error", e.message);
    }
  };

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };
  return (
    <>
      <p className="grey-section-label">Profile picture</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img alt="profile photo" className="profile-photo-bubble" src={photo} />
        <Button
          className="primary-btn"
          styles={{ marginRight: "13px" }}
          onClick={() => setModalOpen(!modalOpen)}
        >
          + Change picture
        </Button>
        <Button className="secondary-btn" onClick={() => handleDeletePicture()}>
          Remove picture
        </Button>
      </div>

      <Modal
        isOpen={modalOpen}
        toggleSidebar={() => {
          setModalOpen(false);
        }}
        type={"center"}
      >
        <h2 className="h2">Upload profile photo</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNewProfilePhoto();
          }}
          action="http://localhost:3001/user/profile-photo"
          method="POST"
          encType="multipart/form-data"
        >
          <input
            className="normal-input"
            type="file"
            name="png"
            required
            ref={fileInputRef}
            id="file-input"
            accept=".png"
          />
          <Button
            className="secondary-btn"
            type="button"
            onClick={() => {
              setModalOpen(false);
            }}
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
