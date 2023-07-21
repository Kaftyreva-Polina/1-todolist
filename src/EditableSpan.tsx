import React, {ChangeEvent, memo, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (newTitle: string) => void
}
const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log("EditableSpan")
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.title)

    // const toggleEditMode = () => {
    //     if (isEditMode) {
    //         setIsEditMode(isEditMode)
    //         props.changeTitle(value)
    //     }
    //     setIsEditMode(!isEditMode)
    // }

    const activateEditMode = () => {
        setIsEditMode(true);
        setValue(props.title);
    }
    const activateViewMode = () => {
        setIsEditMode(false);
        props.changeTitle(value);
    }


    const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (isEditMode
            ? <TextField
                variant="standard"
                size="small"
                value={value}
                onBlur={activateViewMode}
                onChange={setValueHandler}
                autoFocus/>
            : <span
                onDoubleClick={activateEditMode}
                className={props.classes}>{value}</span>
    );
});

export default EditableSpan;

