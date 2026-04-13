import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const useBoardStore = create((set) => ({
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
    columns: {
        "column-1": {
            id: "column-1",
            title: "To Do",
            taskIds: ["task-1", "task-2", "task-3"]
        },
        "column-2": {
            id: "column-2",
            title: "In Progress",
            taskIds: []
        },
        "column-3": {
            id: "column-3",
            title: "In Review",
            taskIds: []
        },
        "column-4": {
            id: "column-4",
            title: "Done",
            taskIds: []
        }
    },
    tasks: {
        "task-1": {
            id: "task-1",
            title: "make an account",
            description: "register yourself with the firm",
            priority: "high",
            label: "important",
            dueDate: "2026-08-08",
            createdAt: "2026-04-13",
        },
        "task-2": {
            id: "task-2",
            title: "funds",
            description: "add funds to the account",
            priority: "high",
            label: "required",
            dueDate: "2026-08-28",
            createdAt: "2026-04-13",
        },
        "task-3": {
            id: "task-3",
            title: "transaction",
            description: "move funds between the company accounts",
            priority: "medium",
            label: "needs attention",
            dueDate: "2027-09-18",
            createdAt: "2026-08-13",
        }
    },
    addColumn : (columnData) => {
        const new_id = uuidv4();
        
        set((state) => ({
            ...state,
            columnOrder : [...state.columnOrder , new_id] ,
            columns : {
                ...state.columns,
                [new_id] : {
                    id: new_id,
                    ...columnData
                }
            }
        }))
    },
    addTask: (columnId, taskData) => {
        const new_id = uuidv4();

        set((state) => ({
            ...state,
            tasks: {
                ...state.tasks,
                [new_id]: {
                    id: new_id,
                    ...taskData,
                    createdAt: new Date().toISOString()
                }
            },
            columns: {
                ...state.columns,
                [columnId]: {
                    ...state.columns[columnId], 
                    taskIds: [...state.columns[columnId].taskIds, new_id]
                }

            }
        }));
    },

    // moveTask will move the task from one column to another by moving its id 
    moveTask: (columnId_1, columnId_2, taskId) => {
        set((state) => ({
            ...state,
            columns: {
                ...state.columns,
                [columnId_1]: {
                    ...state.columns[columnId_1],
                    taskIds: state.columns[columnId_1].taskIds.filter(id => id!== taskId)
                },
                [columnId_2]: {
                    ...state.columns[columnId_2],
                    taskIds: [...state.columns[columnId_2].taskIds, taskId]
                }
            }
        }))
    },

    deleteTask: (taskId , columnId) => {
        
        set((state ) => {
            const { [taskId]: removed, ...remainingTasks } = state.tasks
            return ({
            ...state,
            tasks : remainingTasks,
            columns : {
                ...state.columns,
                [columnId] : {
                    ...state.columns[columnId],
                    taskIds: state.columns[columnId].taskIds.filter(id => id !== taskId)
                }
            }
        })
            
        })
    }
}))

export default useBoardStore;