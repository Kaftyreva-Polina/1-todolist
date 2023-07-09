import React, {FC} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, List, ListItem, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {UniversalCheckBox} from "./components/UniversalCheckBox";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

type TodolistPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodolistWithRedux: FC<TodolistPropsType> = (props) => {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    let isAllTasksNotIsDone = true
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }


    if (props.filter === "active") {
        tasks = tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true)
    }

    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
    const todoListItems: Array<JSX.Element> = tasks.map((task) => {
        const removeTaskHandler = () => {
            dispatch(removeTaskAC(task.id, props.todoListId))
        }
        const changeTaskTitle = (newTitle: string) => {
            dispatch(changeTaskTitleAC(task.id, newTitle, props.todoListId))
        }
        const changeStatusHandler = (taskId: string, newIsDone: boolean) => {
            dispatch(changeTaskStatusAC(taskId, newIsDone, props.todoListId))
        }
        return (
            <ListItem
                key={task.id}
                divider
                disablePadding
                secondaryAction={
                    <IconButton
                        size="small"
                        onClick={removeTaskHandler}><DeleteForeverIcon/>
                    </IconButton>
                }
            >
                <UniversalCheckBox isDone={task.isDone} callBack={(isDone) => changeStatusHandler(task.id, isDone)}/>
                <EditableSpan title={task.title}
                              changeTitle={changeTaskTitle}
                              classes={task.isDone ? "task-done" : "task"}
                />
            </ListItem>
        )
    })

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
    }
    const removeTodoList = () => {
        let action = removeTodolistAC(props.todoListId)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(title, props.todoListId))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(props.todoListId, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(props.todoListId, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(props.todoListId, "completed"))


    return (
        <div className={todoClasses}>
            <Typography
                variant="h5"
                align="center"
                gutterBottom
            >
                <EditableSpan title={props.title}
                              changeTitle={changeTodolistTitle}/>
                <Button
                    variant="contained"
                    endIcon={<DeleteForeverIcon/>}
                    sx={{ml: "15px"}}
                    size="small"
                    onClick={removeTodoList}>Del
                </Button>
            </Typography>
            <AddItemForm addItem={addTask}
                         maxTitleLength={15}
                         recommendedTitleLength={20}/>
            <List>
                {todoListItems}
            </List>
            <div className={"btn-filter-container"}>
                <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}
                >All
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}
                >Active
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    disableElevation
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodolistWithRedux;
