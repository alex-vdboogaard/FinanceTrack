import closeIcon from "../../../assets/close.svg";
import Task from "./Task";
import "./Tasks.css";
import { useEffect } from "react";

export default function TasksWidget({
    showTasksWidget,
    closeTasksWidget,
    tasks,
    rerender,
}) {
    const rerenderTasks = (id) => {
        rerender();
    };

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === "Escape") {
                closeTasksWidget();
            }
        };

        // Add event listener when the component mounts
        if (showTasksWidget) {
            document.addEventListener("keydown", handleEscapeKey);
        }

        // Cleanup event listener when the component unmounts or widget is hidden
        return () => {
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [showTasksWidget, closeTasksWidget]);

    return (
        showTasksWidget && (
            <div className="task-widget">
                <button
                    onClick={() => {
                        closeTasksWidget();
                    }}
                    className="close-icon"
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
                <h3 className="tasks-title">Tasks</h3>

                {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                        <Task
                            rerender={rerenderTasks}
                            key={task.id}
                            task={task}
                        />
                    ))
                ) : (
                    <p>All done 👏👏👏</p>
                )}
            </div>
        )
    );
}
