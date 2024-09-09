import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

type PropsType = {
    title: string,
    tasks: Array<TaskType>
    deleteTask: Function
}

export default function Todolist(props: PropsType){
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>Добавить</button>
            </div>
            <ul>
                {
                    props.tasks.map( (t)=> {
                        return  (
                            <li>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={() => {props.deleteTask(t.id)}}>Удалить</button>                            </li>
                        )
                    })
                }
            </ul>
            <button>Все</button>
            <button>Надо сделать</button>
            <button>Завершенные</button>
        </div>
    )
}