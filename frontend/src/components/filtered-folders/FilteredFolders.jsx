import { useEffect, useState } from "react";
import { fetchData } from "../../utility/fetchData";
import Folders from "../../pages/statements/folders/Folders";
export default function FilteredFolders({ title = "", name }) {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetchData(`http://localhost:3001/statements/tag/${name}`).then(
            (data) => {
                setLoading(false);
                setFolders(data.folders);
            }
        );
    }, []);

    return (
        <>
            {title && <h2 className="h2">{title}</h2>}
            <Folders
                folders={folders}
                loading={loading}
                styles={{ marginTop: "40px" }}
            ></Folders>
        </>
    );
}
