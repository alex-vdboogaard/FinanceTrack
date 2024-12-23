import { getFileSizeFromBase64 } from "../../utility/fileSize";
import fileIcon from "../../assets/file.svg";
import { formatDate } from "../../utility/dates";

export default function RecentFiles({ preview, statements, loading = true }) {
  return (
    <>
      {<h2 className="h2">Recent</h2>}
      {loading ? (
        <p>Loading</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {statements &&
            statements.map((file) => (
              <div className="recent-file" key={file.id}>
                <img src={fileIcon} alt="file icon" />
                <div>
                  <h3
                    onClick={() => {
                      preview(file.pdf_blob);
                    }}
                    className="folder-heading file-heading"
                  >
                    {file.name}
                  </h3>
                  <p>
                    {formatDate(file.created_at)} - 1 MB
                    {/* {getFileSizeFromBase64(file.pdf_blob)} MB */}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
