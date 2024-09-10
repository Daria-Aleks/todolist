import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';

export type FilterValueType = "all" | "completed" | "active";


function App() {
  let initTasks: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "REACT", isDone: false}
  ]
  
  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValueType>("all")
//54:38 2 урок

  useState(tasks)
  
  function deleteTask(id: number){
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValueType) {
    setFilter(value);
  }
  
  let tasksForTodolist = tasks;
  if(filter === "completed"){
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }
  if(filter === "active"){
    tasksForTodolist = tasks.filter(t => t.isDone === false)
  }

  return (
    <div className="App">
      <Todolist 
      title="Что выучить" 
      tasks={tasksForTodolist}
      deleteTask={deleteTask}
      changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
