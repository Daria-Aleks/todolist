import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';
import { v1 } from 'uuid';
import { title } from 'process';

export type FilterValueType = "all" | "completed" | "active";
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValueType
}


function App() {
  
  function deleteTask(id: string, todolistId: string){
    let tasks = tasksObj[todolistId];

    let filteredTasks = tasks.filter(t => t.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todolistId: string){
    let newTask = { 
      id: v1(), 
      title: title,
      isDone: false
    } 
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus (taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find (t => t.id === taskId);
    if (task){
      task.isDone = isDone;
      setTasks({...tasksObj})
      }
    }

  function changeFilter(value: FilterValueType, todolistId: string) { 
    let todolist = todolists.find(tl => tl.id === todolistId);
    if(todolist){
      todolist.filter = value;
      setTodolist([...todolists])
    }
   }
  

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todolists, setTodolist] = useState<Array<TodolistType>>([
    {
      id: todoListId1,
      title: "Что выучить",
      filter: "active"
    },
    {
      id: todoListId2,
      title: "Что сделать",
      filter: "completed"
    }
  ])

  let removeTodolist = (todoListId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
    setTodolist(filteredTodolist);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});

  }

  let[tasksObj, setTasks] = useState({
    [todoListId1]: [
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false},
      {id: v1(), title: "REACT", isDone: false}
    ],
    [todoListId2]: [
      {id: v1(), title: "Почитать книгу", isDone: true},
      {id: v1(), title: "Посмотреть фильм", isDone: false},
    ]
  })

  return (
    <div className="App">
      {
      todolists.map ((tl)=> {
        let tasksForTodolist = tasksObj[tl.id];
        if(tl.filter === "completed"){
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }
        if(tl.filter === "active"){
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
        }
        return <Todolist 
        key={tl.id}
        id={tl.id}
        title={tl.title} 
        tasks={tasksForTodolist}
        deleteTask={deleteTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={tl.filter}
        removeTodolist={removeTodolist}
        />
      })
    }
    </div>
  );
}

export default App;
