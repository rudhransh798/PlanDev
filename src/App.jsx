import Navbar from './components/Navbar'

function App() {
  const handleAddTask = () => {
    // TODO : open add task modal
  }
  return (
    <div>
      <Navbar onAddTask = {handleAddTask}/>
    </div>
  )
}

export default App
