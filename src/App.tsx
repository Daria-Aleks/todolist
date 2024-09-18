import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';
import { v1 } from 'uuid';
import { title } from 'process';

export type FilterValueType = "all" | "completed" | "active";



function App() {
  let initTasks: Array<TaskType> = [
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: false},
    {id: v1(), title: "REACT", isDone: false}
  ]
  
  const [tasks, setTasks] = useState(initTasks);
  const [filter, setFilter] = useState<FilterValueType>("all")

  useState(tasks)
  
  function deleteTask(id: string){
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  function addTask(title: string){
    let newTask = { 
      id: v1(), 
      title: title,
      isDone: false
    } 
    let newTasks = [newTask, ...tasks];
    setTasks(newTasks);
  }

  function changeStatus (taskId: string, isDone: boolean) {
    let task = tasks.find (t => t.id === taskId);
    if (task){
      task.isDone = isDone;
      }
    setTasks([...tasks]);
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
      changeFilter={changeFilter}
      addTask={addTask}
      changeTaskStatus={changeStatus}
      filter={filter}
      />
    </div>
  );
}

export default App;
