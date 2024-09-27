import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanPropsType={
    title: string;
    onChange: (newValue: string) => void
}

export default function EditableSpan(props: EditableSpanPropsType){
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return editMode 
    ? <TextField value={title} onChange={onChangeTitleHandler} onBlur={deactivateEditMode} autoFocus/> 
    : <span onDoubleClick={activateEditMode}>{props.title}</span>
}

