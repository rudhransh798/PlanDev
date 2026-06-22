import "./Column.css";
import Card from "../Card"
import { useDroppable } from '@dnd-kit/core'
import useBoardStore from "../../store/useBoardStore";

const Column = ( { column , tasks } ) => {

    const deleteColumn = useBoardStore((state) => (state.deleteColumn))
    const handleDeleteColumn = () =>{
        deleteColumn(column.id);
    }

    const { setNodeRef } = useDroppable({ id: column.id })
    return (
        <div className = "column">
            <div className = "column__header">
                <div className = "column__title-row">
                    <span className={`column__color-dot column__color-dot--${column.color}`}></span>
                    <h3 className = "column__title">{column.title}</h3>
                    <span className = "column__count">Tasks : {tasks.length}</span>
                    <button className="column__delete-btn" onClick={handleDeleteColumn}>X</button>
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