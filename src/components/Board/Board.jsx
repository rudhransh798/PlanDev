import useBoardStore from "../../store/useBoardStore"
import "./Board.css"
import Column from "../Column"

const Board = () => {

    const columnOrder = useBoardStore((state) => state.columnOrder)
    const columns = useBoardStore((state) => state.columns)
    const tasks = useBoardStore((state) => state.tasks)
    const moveTask = useBoardStore((state) => state.moveTask)

    return (
        <div className = "board">
            {columnOrder.map((columnId) => (
                <Column key={columnId} column={columns[columnId]} tasks={columns[columnId].taskIds.map((taskId) => (tasks[taskId]))} onMoveTask = {moveTask} />
            ))}
        </div>
    )


}


export default Board;