import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {useDispatch} from "react-redux";
import {TaskType} from "../TodolistWithRedux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const TaskWithRedux = memo(function ({task, todolistId}: TaskPropsType) {
    console.log("TaskWithRedux")

    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(task.id, todolistId))
    }
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(task.id, newTitle, todolistId))
    }, [task.id, dispatch, todolistId])
    const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC(task.id, newIsDone, todolistId))
    }

    return (
        <ListItem
            divider
            secondaryAction={
                <IconButton
                    size="small"
                    onClick={removeTaskHandler}><Delete/>
                </IconButton>
            }
        >
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onStatusChangeHandler}
            />
            <EditableSpan title={task.title}
                          changeTitle={onTitleChangeHandler}
            />
        </ListItem>
    )
})