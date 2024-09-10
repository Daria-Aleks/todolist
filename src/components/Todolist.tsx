import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState } from "react";
import { FilterValueType } from "../App";

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
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={ (e)=> {
                    setNewTaskTitle(e.currentTarget.value)
                }}/>
                <button onClick={() => 
                    {props.addTask(newTaskTitle);
                    setNewTaskTitle("")
                    }}>Добавить</button>
            </div>
            <ul>
                {
                    props.tasks.map( (t)=> {
                        return  (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {props.deleteTask(t.id)}}>Удалить</button>                            
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={ ()=> {props.changeFilter("all")}}>Все</button>
            <button onClick={ ()=> {props.changeFilter("active")}}>Надо сделать</button>
            <button onClick={ ()=> {props.changeFilter("completed")}}>Завершенные</button>
        </div>
    )
}