import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';



function App() {
  let initTasks: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: false},
    {id: 3, title: "REACT", isDone: false}
  ]
  
  let arr = useState(initTasks)

  let tasks = arr[0];
  let setTasks = arr[1];
//54:38 2 урок

  useState(tasks)
  
  function deleteTask(id: number){
    let filteredTasks = tasks.filter(t => t.id !== id)
    setTasks(filteredTasks);
  }

  return (
    <div className="App">
      <Todolist 
      title="Что выучить" 
      tasks={tasks}
      deleteTask={deleteTask}/>
    </div>
  );
}

export default App;
