'use client'

import { useState } from "react";
import "./page.css";

/**
 * Component that allows the user to create a task with the name and due date. 
 * @param {*} onCreate function that is called when the create button is clicked; pass the title and due date forward
 * @param {*} onCancel set creation state to false
 * @returns none
 */
function TaskCreateCard( { onCreate, onCancel } ) {
  const [taskText, setTaskText] = useState("");
  const [dueDateText, setDueDateText] = useState("");

  return (
    <div className="task-create-card">
      <div className="task-create-fields">
        <div className="form-field">
          <label htmlFor="task-input">
            Task
          </label>
          <input
            id="task-input"
            type="text"
            placeholder="Your task..."
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)} 
          />
        </div>
        <div className="form-field">
          <label htmlFor="due-date-input">
            Due Date
          </label>
          <input
            id="due-date-input"
            type="text"
            placeholder="Due Date..."
            value={dueDateText} 
            onChange={(e) => setDueDateText(e.target.value)} 
          />
        </div>
      </div>

      <div className="task-create-actions">
        <button
          type="button"
          className="button button-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="button button-primary"
          onClick={() =>
            onCreate({
              title: taskText,
              dueDate: dueDateText,
            })
          }
        >
          Create
        </button>
      </div>
    </div>
  )
}

/**
 * The card component that shows a created tasks information, which includes the title and due date, as well as a checkbox for marking it complete.
 * @param {*} task the task that it is showing; grabs id, title, dueDate
 * @param {*} onToggle to set the task as complete
 * @returns 
 */
function ToDoCard( { task, onToggle } ) {
  return (
    <article className={`todo-card ${task.isCompleted ? "todo-card-completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as complete`}
        className="todo-checkbox"
      />
      <h2 className="todo-title">{task.title}</h2>
      <p className="todo-due-date">Due: {task.dueDate}</p>
    </article>
  );
}

/**
 * Header that has the title and some navigation that isn't defined
 * @returns 
 */
function Header() {
  return (
    <header className="site-header">
      <a className="site-title" href="#home">
        Task Planner
      </a>
      <nav aria-label="Main Navigation" className="site-navigation">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  )
}

// a component must return one JSX element, so we should wrap it in a section or div

/**
 * An array of todo cards.
 */
function TaskDashboard( { tasks, onToggle } ){
  // if there are no tasks yet, show relevant message
  if (tasks.length === 0) {
    return (
      <p className="empty-dashboard">
        No tasks yet. Add your first task.
      </p>
    );
  }

  return(
    <section className="task-dashboard" aria-label="Task list">
      {tasks.map((task) => (
        <ToDoCard
          key={task.id}
          task={task}
          onToggle={onToggle}
        />
      ))}
    </section>
  )
}

/**
 * Click this button to add a new task. will replace itself with the taskcreatecard
 * @param {*} onAdd sets the creating state to true, so the taskcreatecard shows 
 */
function AddButton( { onAdd }) {
  return (
    <button
        type="button"
        className="button button-primary"
        onClick={onAdd}
    >
      Add Task
    </button>
    )
}

/**
 * wraps everything together. holds all the tasks in state, and uses the iscreating state to differentiate between showing the add button and the create task card. 
 */
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  /**
   * creates a new task; triggered by the create button -> passes the title and duedate that was typed into the taskcreatecard
   * @param {*} param0 
   */
  function handleCreate( { title, dueDate }) {
    const newTask = {
      id: crypto.randomUUID(), // Generate unique ID
      title,
      dueDate,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]); // replace old array with new array containing new task; i.e. add new task to array
    setIsCreating(false); 
  }

  /**
   * handler for when the checkbox is clicked and unclicked in the todocard
   * @param {*} taskId in order to differentiate the different tasks each has id
   */
  function handleToggle(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  }

  return (
    <div className="page-shell" id="home">
      <Header />
      <main className="dashboard-area">
        <div className="dashboard-toolbar">
          <div>
            <p className="dashboard-eyebrow">Stay organized</p>
            <h1>My Tasks</h1>
          </div>
          {!isCreating && <AddButton onAdd={() => setIsCreating(true)} />}
        </div>

        {isCreating && (
          <TaskCreateCard
            onCreate={handleCreate}
            onCancel={() => setIsCreating(false)}
          />
        )}

        <TaskDashboard tasks={tasks} onToggle={handleToggle} />
      </main>
    </div>
  );
}
