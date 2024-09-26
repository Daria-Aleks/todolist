import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "../App";
import { keyboardKey } from "@testing-library/user-event";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { CheckBox, Delete } from "@mui/icons-material";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string,
    title: string,
    tasks: Array<TaskType>
    deleteTask: (tasId: string, todolistId: string) => void
    changeFilter: (value: FilterValueType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (todolistId:string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string)  => void
    changeTodolistTitle: (id: string, newTitle: string) => void

}

export default function Todolist(props: PropsType){
    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>  
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map( (t)=> {
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }
                        const onChangeTitleHandler = (newValue:string) => {
                            props.changeTaskTitle(t.id, newValue, props.id);
                        }
                        const onDeleteHandler = () => {
                            {props.deleteTask(t.id, props.id)}
                        }
                        return  (
                            <div key={t.id} className={t.isDone ?"is-done" : ""}>
                                <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={t.isDone}/>
                                <span><EditableSpan title={t.title} onChange={onChangeTitleHandler}/></span>
                                <IconButton onClick={onDeleteHandler}>
                                    <Delete/>
                                </IconButton>                            
                            </div>
                        )
                    })
                }
            </div>
            <Button color={'primary'} variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClick}>Все</Button>
            <Button color={'success'} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClick}>Надо сделать</Button>
            <Button color={'secondary'} variant={props.filter === "completed" ? "contained" : "text"} onClick={onCompletedClick}>Завершенные</Button>
        </div>
    )
}

