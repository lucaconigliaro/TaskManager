import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { getStatusBadgeClass } from "../utils/statusUtils";

function TaskRow({ task }) {

    return (
        <tr>
            <td>
                <Link className="text-white task-title-hover" to={`/task/${task.id}`}>
                    {task.title}
                </Link>
            </td>
            <td>
                <span className={getStatusBadgeClass(task.status)}>
                    {task.status}
                </span>
            </td>
            <td>
                {dayjs(task.createdAt).format("DD/MM/YYYY")}
            </td>
        </tr>
    );
}

// Ottimizzazione delle prestazioni per evitare il rendering non necessario
export default React.memo(TaskRow);