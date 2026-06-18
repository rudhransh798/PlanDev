import useBoardStore from "../../store/useBoardStore"
import "./Board.css"
import Column from "../Column"
import { DndContext, closestCenter } from '@dnd-kit/core'
import AddColumn from "../AddColumn";

const Board = () => {

    const columnOrder = useBoardStore((state) => state.columnOrder)
    const columns = useBoardStore((state) => state.columns)
    const tasks = useBoardStore((state) => state.tasks)
    const moveTask = useBoardStore((state) => state.moveTask)

    const handleDragEnd = (event) => {
        if(event.over === null) return;
        const taskId = event.active.id;
        const toColumnId = event.over.id;
        const fromColumnId = Object.values(columns).find(column => column.taskIds.includes(taskId)).id;
        if(fromColumnId !== toColumnId) {
            moveTask(fromColumnId, toColumnId, taskId);
        }
    }

    return (
        <div className = "board">
            <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
            {columnOrder.map((columnId) => (
                <Column key={columnId} column={columns[columnId]} tasks={columns[columnId].taskIds.map((taskId) => (tasks[taskId]))} onMoveTask = {moveTask} />
            ))}
            </DndContext>
            <AddColumn />
        </div>
    )


}


export default Board;