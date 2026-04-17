import "./Column.css";
import Card from "../Card"

const Column = ( { column , tasks , onMoveTask } ) => {
    return (
        <div className = "column">
            <div className = "column__header">
                <div className = "column__title-row">
                    <span className = "column__color-dot"></span>
                    <h3 className = "column__title">{column.title}</h3>
                    <span className = "column__count">Tasks : {tasks.length}</span>
                </div>
            </div>
            <div className = "column__tasks">
                { tasks.map( (task) => (
                    <Card key={task.id} task={task} columnId={column.id} />
                ) ) }
            </div>
        </div>
    )
}

export default Column;