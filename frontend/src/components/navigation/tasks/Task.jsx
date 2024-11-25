import closeIcon from "../../../assets/close.svg";
import { fetchData } from "../../../utility/fetchData";
import taskIcon from "../../../assets/task.svg";
import { useState } from "react";
export default function Task({ task, rerender }) {
    const [done, setDone] = useState(false);
    
    const handleDelete = (id) => {
        fetchData(`http://localhost:3001/user/task/${id}`, "DELETE").then(
            () => {
                rerender(id);
            }
        );
    };
    return (
        <div className="task">
            <button className="task-icon">
                <img src={taskIcon} alt="" />
            </button>
            <div>
                <p className="task-title">{task.title}</p>
            </div>
            <button
                className="delete-task-icon"
                onClick={() => {
                    handleDelete(task.id);
                }}
            >
                <img src={closeIcon} alt="close icon" />
            </button>
        </div>
    );
}
