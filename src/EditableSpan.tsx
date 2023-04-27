import React, {ChangeEvent, FC, useState} from "react";

type EditableSpanPropsType = {
    title: string
    classes?: string
    changeTitle: (newTitle: string) => void
}
const EditableSpan: FC<EditableSpanPropsType> = (
    {
        title,
        classes,
        changeTitle
    }) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    // const onEditMode = () => {
    //     setIsEditMode(false)
    //     setValue(value)
    //     // setValue(title)
    // }
    // const offEditMode = () => {
    //     changeTitle(value)
    //     setIsEditMode(true)
    //
    // }

    const toggleEditMode = () => {
        if (isEditMode) {
            changeTitle(value)
            setIsEditMode(isEditMode)
        }
        setIsEditMode(!isEditMode)
    }


    const setValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (isEditMode
            ? <input value={value}
                     onBlur={toggleEditMode}
                     onChange={setValueHandler}
                     autoFocus/>
            : <span
                onDoubleClick={toggleEditMode}
                className={classes}>{value}</span>
    );
};

export default EditableSpan;

