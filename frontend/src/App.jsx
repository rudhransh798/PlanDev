import Navbar from './components/Navbar'
import Board from "./components/Board"
import { useState } from 'react'
import Modal from "./components/Modal"
import useBoardStore from './store/useBoardStore'
function App() {

  const [isModalOpen , setIsModalOpen] = useState(false);

  const columns = useBoardStore((state) => state.columns);

  const addTask = useBoardStore((state) => state.addTask);

  const handleAddTask = () => {
    setIsModalOpen(true);
  }

  const handleTaskSubmit = (columnId , taskData) => {
    addTask(columnId , taskData);
  }
  return (
    <div>
      <Navbar onAddTask = {handleAddTask}/>
      <Board />
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} onSubmit={handleTaskSubmit} columns={columns} />}
    </div>
  )
}

export default App
