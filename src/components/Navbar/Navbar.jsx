import "./Navbar.css"

function Navbar( { onAddTask }) {
  return (
    <nav className = "navbar">
      <div className = "navbar__logo">
        <span className="navbar__logo-icon">⚡</span>
        <span className= "navbar__logo-text">PlanDev</span>
      </div>
      <div className = "navbar__search">
        <span className="navbar__search-icon">🔍</span>
        <input className="navbar__search-input" type="text" placeholder="Search tasks..."/>
      </div>
      <button onClick = { () => onAddTask()} className = "navbar__add-btn">+ Add Task</button>
    </nav>
  )
}

export default Navbar;