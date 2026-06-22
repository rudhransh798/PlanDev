import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { persist } from "zustand/middleware";

const useBoardStore = create(
    persist(
        (set) => ({
            columnOrder: ["column-1", "column-2", "column-3", "column-4"],
            columns: {
                "column-1": {
                    id: "column-1",
                    title: "To Do",
                    color: "todo",
                    taskIds: ["task-1", "task-2", "task-3"]
                },
                "column-2": {
                    id: "column-2",
                    title: "In Progress",
                    color: "inprogress",
                    taskIds: ["task-4" , "task-5"]
                },
                "column-3": {
                    id: "column-3",
                    title: "In Review",
                    color: "inreview",
                    taskIds: ["task-6"]
                },
                "column-4": {
                    id: "column-4",
                    title: "Done",
                    color: "done",
                    taskIds: ["task-7"]
                }
            },
            tasks: {
                "task-1": {
                    id: "task-1",
                    title: "Set up CI/CD pipeline",
                    description: "Configure GitHub Actions to run automated tests and deploy the app on every push to main",
                    priority: "high",
                    label: "DevOps",
                    dueDate: "2026-07-01",
                    createdAt: "2026-04-13",
                },
                "task-2": {
                    id: "task-2",
                    title: "Write unit tests for store",
                    description: "Add test coverage for all Zustand store actions including addTask, moveTask, and deleteTask",
                    priority: "medium",
                    label: "Testing",
                    dueDate: "2026-07-05",
                    createdAt: "2026-04-13",
                },
                "task-3": {
                    id: "task-3",
                    title: "Update README with API docs",
                    description: "Document all planned REST API endpoints for the future backend integration",
                    priority: "low",
                    label: "Docs",
                    dueDate: "2026-07-10",
                    createdAt: "2026-08-13",
                },
                "task-4": {
                    id: "task-4",
                    title: "Build authentication flow",
                    description: "Implement login and signup screens with form validation and JWT token storage",
                    priority: "high",
                    label: "Backend",
                    dueDate: "2026-06-28",
                    createdAt: "2026-08-13",
                },
                "task-5": {
                    id: "task-5",
                    title: "Design dashboard layout",
                    description: "Create wireframes and implement the main dashboard UI with sidebar navigation and stats cards",
                    priority: "medium",
                    label: "Design",
                    dueDate: "2026-06-30",
                    createdAt: "2026-08-13",
                },
                "task-6": {
                    id: "task-6",
                    title: "Code review — navbar component",
                    description: "Review pull request for the navbar refactor including search functionality and responsive mobile menu",
                    priority: "medium",
                    label: "Frontend",
                    dueDate: "2026-06-25",
                    createdAt: "2026-08-13",
                },
                "task-7": {
                    id: "task-7",
                    title: "Initialize project with Vite",
                    description: "Scaffold the React project using Vite, set up folder structure, install all dependencies and configure ESLint",
                    priority: "low",
                    label: "Setup",
                    dueDate: "2026-06-25",
                    createdAt: "2026-08-13",
                }
            },
            addColumn: (columnData) => {
                const new_id = uuidv4();
                set((state) => ({
                    columnOrder: [...state.columnOrder, new_id],
                    columns: {
                        ...state.columns,
                        [new_id]: {
                            id: new_id,
                            ...columnData
                        }
                    }
                }))
            },

            addTask: (columnId, taskData) => {
                const new_id = uuidv4();
                set((state) => ({
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

            moveTask: (columnId_1, columnId_2, taskId) => {
                set((state) => ({
                    columns: {
                        ...state.columns,
                        [columnId_1]: {
                            ...state.columns[columnId_1],
                            taskIds: state.columns[columnId_1].taskIds.filter(id => id !== taskId)
                        },
                        [columnId_2]: {
                            ...state.columns[columnId_2],
                            taskIds: [...state.columns[columnId_2].taskIds, taskId]
                        }
                    }
                }))
            },

            deleteColumn: (columnId) => {
                set((state) => {
                    const { [columnId]: _, ...remainingColumns } = state.columns
                    const remainingColumnOrder = state.columnOrder.filter(id => id !== columnId)
                    const taskIdsToRemove = state.columns[columnId].taskIds
                    const remainingTasks = Object.fromEntries(
                        Object.entries(state.tasks).filter(([id]) => !taskIdsToRemove.includes(id))
                    )
                    return {
                        columns: remainingColumns,
                        columnOrder: remainingColumnOrder,
                        tasks: remainingTasks
                    }
                })
            },

            deleteTask: (taskId, columnId) => {
                set((state) => {
                    const { [taskId]: _, ...remainingTasks } = state.tasks
                    return {
                        tasks: remainingTasks,
                        columns: {
                            ...state.columns,
                            [columnId]: {
                                ...state.columns[columnId],
                                taskIds: state.columns[columnId].taskIds.filter(id => id !== taskId)
                            }
                        }
                    }
                })
            }
        }),
        {
            name: 'plandev-board'
        }
    ))

export default useBoardStore;