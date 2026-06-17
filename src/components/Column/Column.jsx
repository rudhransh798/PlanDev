import "./Column.css";
import Card from "../Card"
import { useDroppable } from '@dnd-kit/core'

const Column = ( { column , tasks , onMoveTask } ) => {
    const { setNodeRef } = useDroppable({ id: column.id })
    return (
        <div className = "column">
            <div className = "column__header">
                <div className = "column__title-row">
                    <span className={`column__color-dot column__color-dot--${column.color}`}></span>
                    <h3 className = "column__title">{column.title}</h3>
                    <span className = "column__count">Tasks : {tasks.length}</span>
                </div>
            </div>
            <div className = "column__tasks" ref={setNodeRef}>
                { tasks.map( (task) => (
                    <Card key={task.id} task={task} columnId={column.id} />
                ) ) }
            </div>
        </div>
    )
}

export default Column;