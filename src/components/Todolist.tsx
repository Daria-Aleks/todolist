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
}

export default function Todolist(props: PropsType){
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const onNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if(e.key === "Enter"){
                props.addTask(newTaskTitle);
                setNewTaskTitle("")
            }
        }
    const addTaskFunc = () => 
        {props.addTask(newTaskTitle);
        setNewTaskTitle("")
        }    
    const onAllClick = () => props.changeFilter("all")
    const onActiveClick = () => props.changeFilter("active")
    const onCompletedClick = () => props.changeFilter("completed")

    
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTaskTitle}
                onKeyUp={onKeyUpHandler}/>
                <button onClick={addTaskFunc}>Добавить</button>
            </div>
            <ul>
                {
                    props.tasks.map( (t)=> {
                        const onDeleteHandler = () => {
                            {props.deleteTask(t.id)}
                        }
                        return  (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={onDeleteHandler}>Удалить</button>                            
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={onAllClick}>Все</button>
            <button onClick={onActiveClick}>Надо сделать</button>
            <button onClick={onCompletedClick}>Завершенные</button>
        </div>
    )
}