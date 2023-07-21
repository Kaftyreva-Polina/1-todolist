import React, {memo, useCallback} from "react";
import {IconButton, ListItem} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {UniversalCheckBox} from "./components/UniversalCheckBox";
import EditableSpan from "./EditableSpan";
import {TaskType} from "./TodolistWithRedux";


export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskId: string, newTitle: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    removeTask: (taskId: string) => void

}
export const Task = memo(({
                         task,
                         changeTaskTitle,
                         changeTaskStatus,
                         removeTask
                     }: TaskPropsType) => {
    console.log("Task")
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }, [changeTaskTitle, task.id])
    const onStatusChangeHandler = useCallback((newIsDone: boolean) => {
        changeTaskStatus(task.id, newIsDone)
    }, [changeTaskStatus, task.id])

    return (
        <ListItem
            divider
            disablePadding
            secondaryAction={
                <IconButton
                    size="small"
                    onClick={removeTaskHandler}><DeleteForeverIcon/>
                </IconButton>
            }
        >
            <UniversalCheckBox isDone={task.isDone} callBack={onStatusChangeHandler}/>
            <EditableSpan title={task.title}
                          changeTitle={onTitleChangeHandler}
                          classes={task.isDone ? "task-done" : "task"}
            />
        </ListItem>
    )
})