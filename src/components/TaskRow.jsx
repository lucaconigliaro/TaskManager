import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
 // Funzione per determinare la classe in base allo stato del task
    const getStatusClass = (status) => {
        if (status === "To do")
            return "bg-danger text-white";
        else if (status === "Doing")
            return "bg-warning text-dark";
        else if (status === "Done")
            return "bg-success text-white";
        return "";
    };

    return (
        <tr>
            <td>
                <Link className="text-decoration-none text-white" to={`/task/${task.id}`}>
                    {task.title}
                </Link>
            </td>
            <td className={getStatusClass(task.status)}>
                {task.status}
            </td>
            <td>
                {dayjs(task.createdAt).format("DD/MM/YYYY")}
            </td>
        </tr>
    );
};

export default React.memo(TaskRow);