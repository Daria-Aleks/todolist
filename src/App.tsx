import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist, { TaskType } from './components/Todolist';
import { v1 } from 'uuid';
import { title } from 'process';
import AddItemForm from './components/AddItemForm';
import { AppBar, Button, Container, Grid, Grid2, IconButton, Menu, Paper, Toolbar, Typography } from '@mui/material';
import { MenuBook } from '@mui/icons-material';

export type FilterValueType = "all" | "completed" | "active";
type TodolistType = {
  id: string,
  title: string,
  filter: FilterValueType
}

type TaskStateType = {
  [key: string]: Array<TaskType>

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
  function changeTaskTitle (taskId: string, newTitle: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find (t => t.id === taskId);
    if (task){
      task.title = newTitle;
      setTasks({...tasksObj})
      }
  }

  function changeTodolistTitle (id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if(todolist){
      todolist.title = newTitle;
      setTodolist([...todolists])
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
      filter: "all"
    },
    {
      id: todoListId2,
      title: "Что сделать",
      filter: "all"
    }
  ])

  let removeTodolist = (todoListId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todoListId)
    setTodolist(filteredTodolist);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});

  }


  let[tasksObj, setTasks] = useState<TaskStateType>({
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

  function addTodolist(title:string){
    let todolist:TodolistType = {
      id: v1(),
      title: title,
      filter: "all"
    }
    setTodolist([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id] : []
    })
  }

  return (
    <div className="App">
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <MenuBook/>
          </IconButton>
          <Typography variant='h6'>
            Новости
          </Typography>
          <Button>Войти</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid2 container style={{padding: "10px"}}>
          <AddItemForm addItem={addTodolist}/>
        </Grid2>
        <Grid2 container spacing={3}>
        {
          todolists.map ((tl)=> {
          let tasksForTodolist = tasksObj[tl.id];
          if(tl.filter === "completed"){
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
          }
          if(tl.filter === "active"){
          tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
          }
        return (
        <Grid item>
          <Paper style={ {padding: "10px"}}>
          <Todolist 
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
        changeTaskTitle={changeTaskTitle}
        changeTodolistTitle={changeTodolistTitle}
        />
        </Paper>
        </Grid>)
      })
    }
        </Grid2>
      </Container>
    </div>
  );
}

export default App;
