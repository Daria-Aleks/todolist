import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "../App";
import { keyboardKey } from "@testing-library/user-event";

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
}

export default function Todolist(props: PropsType){
    
    const [error, setError] = useState<string|null> (null)
    const [newTaskTitle, setNewTaskTitle] = useState ("");
    const onNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            setError(null);
            if(e.key === "Enter"){
                props.addTask(newTaskTitle, props.id);
                setNewTaskTitle("")
            }
        }
    const addTaskFunc = () => {
         if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle, props.id);
        setNewTaskTitle("")
         }   
         else{
            setError("Введите текст задачи")
        }
        }    
    const onAllClick = () => props.changeFilter("all", props.id)
    const onActiveClick = () => props.changeFilter("active", props.id)
    const onCompletedClick = () => props.changeFilter("completed", props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    
    return (
        <div>
            <h3>{props.title} <button onClick={removeTodolist}>Удалить todolist</button></h3>
            <div>
                <input value={newTaskTitle.trim()} onChange={onNewTaskTitle}
                onKeyUp={onKeyUpHandler}
                className={error ? "error" : ""}
                />
                <button onClick={addTaskFunc}>Добавить</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map( (t)=> {
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
                        }
                        const onDeleteHandler = () => {
                            {props.deleteTask(t.id, props.id)}
                        }
                        return  (
                            <li key={t.id} className={t.isDone ?"is-done" : ""}>
                                <input type="checkbox" 
                                onChange={onChangeHandler}
                                checked={t.isDone}/>
                                <span>{t.title}</span>
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