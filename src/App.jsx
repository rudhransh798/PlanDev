import Navbar from './components/Navbar'
import  Board from "./components/Board"
function App() {
  const handleAddTask = () => {
    // TODO : open add task modal
  }
  return (
    <div>
      <Navbar onAddTask = {handleAddTask}/>
      <Board />
    </div>
  )
}

export default App
