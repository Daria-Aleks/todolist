import { useState, ChangeEvent, KeyboardEvent } from "react";
type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export default function AddItemForm(props: AddItemFormPropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState ("");
    const onNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.key === "Enter"){
            props.addItem(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const [error, setError] = useState<string|null> (null)
    const addTaskFunc = () => {
        if (newTaskTitle.trim() !== "") {
           props.addItem(newTaskTitle);
       setNewTaskTitle("")
        }   
        else{
           setError("Введите текст задачи")
       }
       }    

    return (
        <div>
                <input value={newTaskTitle.trim()} onChange={onNewTaskTitle}
                onKeyUp={onKeyUpHandler}
                className={error ? "error" : ""}
                />
                <button onClick={addTaskFunc}>Добавить</button>
                {error && <div className="error-message">{error}</div>}
            </div>
    )
}