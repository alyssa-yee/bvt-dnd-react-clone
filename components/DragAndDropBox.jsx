import React from 'react'
import './DragAndDropBox.css'



export default class DragAndDropBox extends React.Component {
  state = {
    tasks: [
      { id: 1, name: "Learn Angular", columnId: 1, bgcolor: "red" },
      { id: 2, name: "React", columnId: 2, bgcolor: "pink" },
      { id: 3, name: "Vue", columnId: 3, bgcolor: "skyblue" },
    ],
    columns: [
      { id: 1, title: "BACKLOG", category: "backlog" },
      { id: 2, title: "IN PROGRESS", category: "wip" },
      { id: 3, title: "COMPLETE", category: "complete" },
    ],
  };

  
  componentDidMount() {
    // Check if there are stored columns and tasks in local storage
    const storedColumns = localStorage.getItem("columns");
    const storedTasks = localStorage.getItem("tasks");
    if (storedColumns && storedTasks) {
      const columns = JSON.parse(storedColumns);
      const tasks = JSON.parse(storedTasks);
      this.setState({ columns, tasks });
    }
  }

  componentDidUpdate() {
    // Update local storage with the current columns and tasks
    const { columns, tasks } = this.state;
    localStorage.setItem("columns", JSON.stringify(columns));
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add a new column
  onAddColumn = () => {
    const { columns } = this.state;
    const newColumnId = columns.length + 1;
    const newColumn = { id: newColumnId, title: "New Column", category: "backlog" };

    const updatedColumns = [...columns, newColumn];
    this.setState({ columns: updatedColumns });
  };

  // Handler for drag start event
  onDragStart = (ev, taskId) => {
    ev.dataTransfer.setData("taskId", taskId);
  };
  
  //Handler for drag over event
  onDragOver = (ev) => {
    ev.preventDefault();
  }
  
  // Handler for drop event
  onDrop = (ev, columnId) => {
    const taskId = ev.dataTransfer.getData("taskId");
    const { tasks } = this.state;

    const updatedTasks = tasks.map((task) => {
      if (task.id === Number(taskId)) {
        task.columnId = columnId;
      }
      return task;
    });

    this.setState({ tasks: updatedTasks });
  };

  // Reset the page by clearing local storage and restoring initial state
  resetPage = () => {
    localStorage.clear(); // Clear local storage
    this.setState({
      tasks: [
        { id: 1, name: "Learn Angular", columnId: 1, bgcolor: "red" },
        { id: 2, name: "React", columnId: 2, bgcolor: "pink" },
        { id: 3, name: "Vue", columnId: 3, bgcolor: "skyblue" },
      ],
      columns: [
        { id: 1, title: "BACKLOG", category: "backlog" },
        { id: 2, title: "IN PROGRESS", category: "wip" },
        { id: 3, title: "COMPLETE", category: "complete" },
      ],
    });
  };

  render () {       
    const { columns, tasks } = this.state;
    
    // Render column components
    const columnComponents = columns.map((column) => (
      <div
        key={column.id}
        className="dnd-col"
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => {
          this.onDrop(e, column.id);
        }}
      >
        <div className="task-header-wrapper">
          <h1 className="task-header">{column.title}</h1>
        </div>
        {tasks
          .filter((task) => task.columnId === column.id)
          .map((task) => (
            <div
              key={task.id}
              onDragStart={(e) => this.onDragStart(e, task.id)}
              draggable
              className="draggable-item"
              style={{ backgroundColor: task.bgcolor }}
            >
              {task.name}
            </div>
          ))}
      </div>
    ));
      return (
        <div className="dnd-box-container" id="">
        {/* <nav className="navbar">
          <div className="navbar-title">Your Title</div>
          <ul className="navbar-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav> */}
        <button onClick={this.onAddColumn}>Add Column</button>
        <button onClick={this.resetPage}>Reset Page</button>
        <div className="row">{columnComponents}</div>
      </div>
    );
  }
}
