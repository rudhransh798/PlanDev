import "./Card.css";
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ task, columnId }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })
    return (
        <div className="card" ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={{ transform: CSS.Transform.toString(transform) }}>
            <div className="card__header">
                <span className="card__label">{task.label}</span>
                <span className="card__priority">{task.priority}</span>
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