import "./Modal.css"
import { useState } from "react";

const Modal = ({ onClose, onSubmit, columns }) => {

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "medium",
        label: "",
        dueDate: ""
    })
    const [columnId, setColumnId] = useState("column-1")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskData.title == "") return;
        onSubmit(columnId , taskData);
        onClose();


    }


    return (
        <div className="modal__overlay" onClick={onClose}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <div className="modal__header">
                    <h2>Add New Task</h2>
                    <button onClick={onClose}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal__field">
                        <label htmlFor="Title">Title</label>
                        <input type="text" value={taskData.title} onChange={(e) => {
                            setTaskData({ ...taskData, title: e.target.value })
                        }} />
                    </div>
                    <div className="modal__field">
                        <label htmlFor="Description">Description</label>
                        <textarea value={taskData.description} onChange={(e) => {
                            setTaskData({ ...taskData, description: e.target.value })
                        }} />
                    </div>
                    <div className="modal__field">
                        <label htmlFor="Priority"></label>
                        <select value={taskData.priority} onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div className="modal__field">
                        <label htmlFor="label">Label</label>
                        <input type="text" value={taskData.label} onChange={(e) => setTaskData({...taskData , label: e.target.value})}/>
                    </div>
                    <div className="modal__field">
                        <label htmlFor="duedate">Duedate</label>
                        <input type="date" value={taskData.dueDate} onChange={(e) => setTaskData({...taskData , dueDate : e.target.value})}/>
                    </div>
                    <div className="modal__field">
                        <label htmlFor="column">Column</label>
                        <select value={columnId} onChange={(e) => setColumnId(e.target.value)}>
                            {Object.values(columns).map((column) => (
                                <option key={column.id} value={column.id}>{column.title}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">Add Task</button>
                </form>
            </div>
        </div>
    )
}

export default Modal;