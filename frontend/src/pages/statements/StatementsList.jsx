export default function StatementsList({statements, loading}) {
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
                                {statement.name}
                            </div>
                        </td>
                        <td>
                            <button
                                onClick={() =>
                                    handlePreview(statement.pdf_blob)
                                }
                            >
                                <img
                                    src="../src/assets/view.svg"
                                    alt="preview"
                                />
                            </button>
                            <button
                                onClick={() =>
                                    handleDelete(statement.id)
                                }
                            >
                                <img
                                    src="../src/assets/delete.svg"
                                    alt="delete icon"
                                />
                            </button>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
    </table>
    )
}