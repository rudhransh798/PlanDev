import "./Card.css";
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import useBoardStore from "../../store/useBoardStore";

const Card = ({ task, columnId }) => {
    const deleteTask = useBoardStore((state) => state.deleteTask)
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })
    const handleDelete = (e) => {
        e.stopPropagation();
        deleteTask(task.id, columnId);
    }
    return (
        <div className="card" ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Transform.toString(transform) }}>
            <div className="card__header">
                <span className="card__label">{task.label}</span>
                <span className={`card__priority card__priority--${task.priority}`}>{task.priority}</span>
                <button className="card__delete-btn" onClick={handleDelete} onPointerDown={(e) => e.stopPropagation()}
>X</button>
            </div>
            <h4 className="card__title">{task.title}</h4>
            <p className="card__description">{task.description}</p>
            <div className="card__footer">
                <span className="card__due-date">Due: {task.dueDate}</span>
            </div>
        </div>
    )
}


export default Card;