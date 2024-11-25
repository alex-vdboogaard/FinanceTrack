import closeIcon from "../../../assets/close.svg";
import { fetchData } from "../../../utility/fetchData";
import taskIcon from "../../../assets/task.svg";
import { useState } from "react";
export default function Task({ task, rerender }) {
    const [done, setDone] = useState(task.done);

    const handleDone = () => {
        const updatedDone = Math.abs(done - 1); // Calculate the new value
        setDone(updatedDone); // Update the state
        const formData = {
            id: task.id,
            done: updatedDone, // Use the updated value
        };
        fetchData("http://localhost:3001/user/task/done", "PUT", formData).then(
            (successData) => {
                rerender();
            }
        );
    };

    const handleDelete = (id) => {
        fetchData(`http://localhost:3001/user/task/${id}`, "DELETE").then(
            () => {
                rerender(id);
            }
        );
    };

    return (
        <div className="task">
            <button
                className="task-icon"
                onClick={() => {
                    handleDone();
                }}
            >
                <img src={taskIcon} alt="complete task icon" />
            </button>
            <p className={`task-description ${done === 1 ? "done" : ""}`}>
                {task.title}
            </p>

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
