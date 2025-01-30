import { useEffect, useState } from "react";
import Button from "../../../button/Button";
import { fetchData } from "../../../../utility/fetchData";
import { simplePop } from "pop-message";

export default function FullNameSection() {
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    fetchData("http://localhost:3001/user/fullname").then((data) => {
      setFullName(data.fullname);
    });
  }, []);

  const handleType = (e) => {
    setFullName(e.target.value);
  };

  const handleSave = () => {
    fetchData("http://localhost:3001/user/fullname", "PUT", fullName).then(
      (successData) => {
        simplePop("success", successData.message);
      }
    );
  };
  return (
    <>
      <p className="grey-section-label" style={{ marginBottom: "10px" }}>
        Full name
      </p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          className="normal-input"
          value={fullName}
          onChange={(e) => {
            handleType(e);
          }}
        />
        <Button
          styles={{ marginLeft: "10px" }}
          type="submit"
          className="primary-btn"
          onClick={() => handleSave()}
        >
          save
        </Button>
      </div>
    </>
  );
}
