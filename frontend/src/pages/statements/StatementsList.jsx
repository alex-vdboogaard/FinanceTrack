import pops from "pop-message";
import { Link } from "react-router-dom";
import { fetchData } from "../../utility/fetchData";
export default function StatementsList({ statements, setStatements, loading }) {
  // Handle PDF preview
  const handlePreview = (pdfBuffer) => {
    try {
      if (!pdfBuffer || !pdfBuffer.data) {
        throw new Error("Invalid PDF buffer data.");
      }
      const uint8Array = new Uint8Array(pdfBuffer.data);
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const newTab = window.open(url, "_blank");
      if (newTab) {
        newTab.onload = () => {
          URL.revokeObjectURL(url);
        };
      }
    } catch (error) {
      console.error("Error opening PDF preview:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await pops.confirmPop(
      "Are you sure you want to delete this file?"
    );
    if (confirm) {
      fetchData(`http://localhost:3001/statements`, "DELETE", {
        id,
      }).then((successData) => {
        setStatements((prevStatements) =>
          prevStatements.filter((statement) => statement.id !== id)
        );
      });
    }
  };
  return (
    <table className="statements-table">
      <thead>
        <tr>
          <th>Filename</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading.statements === true ? (
          <tr>
            <td colSpan="2" className="text-center">
              Loading...
            </td>
          </tr>
        ) : (
          statements.map((statement) => (
            <tr key={statement.id}>
              <td>
                <div className="file-td">
                  <img
                    className="file-icon"
                    src="./src/assets/file.svg"
                    alt="file icon"
                  />
                  <p>
                    {statement.name}
                    <span className="grey-link">
                      {statement.folder_id == null ? (
                        ""
                      ) : (
                        <>
                          <Link
                            style={{ display: "inline" }}
                            to={`/statements/folder/${statement.folder_id}`}
                          >
                            {" / "} {statement.folder_name}
                          </Link>
                        </>
                      )}
                    </span>
                  </p>
                </div>
              </td>
              <td>
                <button onClick={() => handlePreview(statement.pdf_blob)}>
                  <img src="../src/assets/view.svg" alt="preview" />
                </button>
                <button onClick={() => handleDelete(statement.id)}>
                  <img src="../src/assets/delete.svg" alt="delete icon" />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
