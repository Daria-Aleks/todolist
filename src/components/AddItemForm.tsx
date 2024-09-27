import { Button, IconButton, TextField } from "@mui/material";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
           setError("Введите текст")
       }
       }    

    return (
        <div>
                <TextField 
                value={newTaskTitle.trim()} 
                onChange={onNewTaskTitle}
                onKeyUp={onKeyUpHandler}
                error={!!error}
                variant="outlined"
                label={'Введите значение'}
                helperText={error}
                />
                <IconButton onClick={addTaskFunc} color={'primary'}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </div>
    )
}