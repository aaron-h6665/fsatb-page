'use client'

import { useState } from "react";

function TaskCreateCard( { onCreate, onCancel } ) {
  const [taskText, setTaskText] = useState("");
  const [dueDateText, setDueDateText] = useState("");

  return (
    <div className="w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="task-input" className="text-sm font-medium text-gray-700">
            Task
          </label>
          <input
            id="task-input"
            type="text"
            placeholder="Your task..."
            value={taskText} 
            onChange={(e) => setTaskText(e.target.value)} 
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="due-date-input" className="text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            id="due-date-input"
            type="text"
            placeholder="Due Date..."
            value={dueDateText} 
            onChange={(e) => setDueDateText(e.target.value)} 
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
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

function Checkbox() {
  const [checked, setChecked] = useState(false);
  
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-5 h-5 accent-black cursor-pointer"
      />
      <span className={checked ? "text-white-400 line-through" : "text-black"}>
        Mark as complete
      </span>
    </label>
  )
}

// To-Do List
function ToDoCard( { task, onToggle } ) {
  const [completed, setCompleted] = useState(false);

  checked={task.isCompleted}
  onChange={() => onToggle(task.id)}
  className={task.isCompleted ? "line-through" : ""}
  return (
    <article className="">
      <div className="">

      </div>
      <div>

      </div>
      <div>

      </div>
    </article>
  )

}

function Header() {
  return (
    <header className="w-full flex items-center justify-between py-4 px-20 bg-white">
      <a className="flex items-center gap-3 text-4xl font-bold text-grey-900" href="#home">
        {/* <span className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-md">A</span> */}
        Task Planner
      </a>
      <nav aria-label="Main Navigation" className="flex items-center gap-6">
        <a className="text-sm font-medium text-gray-600 hover:text-black transition-colors" href="#about">About</a>
        <a className="text-sm font-medium text-gray-600 hover:text-black transition-colors" href="#about">Contact</a>
      </nav>
    </header>
  )
}



function TaskDashboard( { tasks, onToggle } ){
  return(
    {tasks.map((task) => (
      <ToDoCard
        key={task.id}
        task={task}
        onToggle={onToggle}
      />
    ))}
  )
}

  // put things into home (state variables so that all of the components can access)
  // handleCancel, handleCreate, 
  // layout 

  // handleAdd() {}

  function handleCancel() {
    setIsCreating(false);
  }



function AddButton( { onAdd }) {
  return (
    <button
        type="button"
        className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors"
        onClick={onAdd}
    >
      Add Task
    </button>
    )
}

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  function handleCreate( { title, dueDate }) {
    const newTask = {
      id: crypto.randomUUID(), // Generate unique ID
      title,
      dueDate,
      isCompleted: false,
    };

    setTasks([...tasks, newTask]); // replace old array with new array containing new task
    setIsCreating(false);
  }

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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header></Header>
      <TaskDashboard tasks={tasks} onToggle={handleToggle} />
      {isCreating ? (
        <TaskCreateCard
          onCreate={handleCreate}
          onCancel={() => setIsCreating(false)}
        />
      ) : (
        <AddButton onAdd={() => setIsCreating(true)} />
      )}
    </div>
  );
}
