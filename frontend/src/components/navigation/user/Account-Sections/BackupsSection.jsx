import { useEffect, useState } from "react";
import { fetchData } from "../../../../utility/fetchData";
import deleteIcon from "../../../../assets/delete.svg";
import { formatDate } from "../../../../utility/dates";
import { confirmPop, simplePop } from "pop-message";
import { useNavigate } from "react-router-dom";
import Button from "../../../button/Button";

export default function BackupsSection() {
  const [backups, setBackups] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleDelete = async (backup) => {
    const confirm = await confirmPop(
      "Are you sure you want to delete this backup?"
    );
    if (confirm) {
      fetchData("http://localhost:3001/backup", "DELETE", backup.name).then(
        (successData) => {
          simplePop("success", "Backup deleted");
          handleRefresh();
        }
      );
    }
  };

  const handleRestore = async (backup) => {
    const confirm = await confirmPop(
      "Restoring this backup will erase all current data. Proceed?"
    );
    if (confirm) {
      fetchData(
        `http://localhost:3001/backup/restore?name=${backup.name}`
      ).then((successData) => {
        navigate("http://localhost:5173/overview");
      });
    }
  };

  useEffect(() => {
    fetchData("http://localhost:3001/backup").then((backups) => {
      setBackups(backups);
    });
  }, [refresh]);

  return (
    <>
      <p className="grey-section-label">Backups</p>
      <table style={{ marginBottom: "50px" }}>
        <thead>
          <tr className="no-border">
            <th>Name</th>
            <th>Date created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {backups.map((backup, index) => (
            <tr key={index}>
              <td>{backup.name}</td>
              <td>{formatDate(backup.createdAt)}</td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    className="primary-btn"
                    onClick={() => {
                      handleRestore(backup);
                    }}
                  >
                    restore
                  </Button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => handleDelete(backup)}
                  >
                    <img src={deleteIcon} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Count: {backups.length}</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}
