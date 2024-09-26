import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "../App";
import { keyboardKey } from "@testing-library/user-event";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

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

}

export default function Todolist(props: PropsType){
    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>Удалить todolist</button></h3>
            <AddItemForm addItem={addTask}/>
            <ul>
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
                            <li key={t.id} className={t.isDone ?"is-done" : ""}>
                                <input type="checkbox" 
                                onChange={onChangeStatusHandler}
                                checked={t.isDone}/>
                                <span><EditableSpan title={t.title} onChange={onChangeTitleHandler}/></span>
                                <button onClick={onDeleteHandler}>Удалить</button>                            
                            </li>
                        )
                    })
                }
            </ul>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClick}>Все</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClick}>Надо сделать</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClick}>Завершенные</button>
        </div>
    )
}

