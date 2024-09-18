import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "../App";
import { keyboardKey } from "@testing-library/user-event";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    deleteTask: (tasId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValueType
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
                props.addTask(newTaskTitle);
                setNewTaskTitle("")
            }
        }
    const addTaskFunc = () => {
         if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle);
        setNewTaskTitle("")
         }   
         else{
            setError("Введите текст задачи")
        }
        }    
    const onAllClick = () => props.changeFilter("all")
    const onActiveClick = () => props.changeFilter("active")
    const onCompletedClick = () => props.changeFilter("completed")

    
    return (
        <div>
            <h3>{props.title}</h3>
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
                            props.changeTaskStatus(t.id, e.currentTarget.checked);
                        }
                        const onDeleteHandler = () => {
                            {props.deleteTask(t.id)}
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