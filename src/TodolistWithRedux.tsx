import React, {FC, memo, useCallback} from "react";
import {FilterValuesType} from "./AppWithRedux";
import {EditableSpan} from "./editableSpan/EditableSpan";
import {Button, List, Typography} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import {ButtonWithMemo} from "./components/ButtonWithMemo";
import {TaskWithRedux} from "./taskComponent/TaskWithRedux";
import AddItemForm from "./addItemForm/AddItemForm";

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

const TodolistWithRedux: FC<TodolistPropsType> = memo((props) => {
    console.log("TodolistWithRedux")

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todoListId])
    const dispatch = useDispatch()

    let isAllTasksNotIsDone = true
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    const todoListItems: Array<JSX.Element> = tasks.map((task) => {
        return (
            <TaskWithRedux
                key={task.id}
                task={task}
                todolistId={props.todoListId}
            />
        )
    })

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.todoListId))
    }, [props.todoListId, dispatch])
    const removeTodoList = useCallback(() => {
        dispatch(removeTodolistAC(props.todoListId))
    }, [props.todoListId, dispatch])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(title, props.todoListId))
    }, [dispatch, props.todoListId])


    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todoListId, "all")),
        [dispatch, props.todoListId])
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todoListId, "active")),
        [dispatch, props.todoListId])
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(props.todoListId, "completed")),
        [props.todoListId, dispatch])


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
                <ButtonWithMemo
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllClickHandler}
                    title={"All"}
                />
                <ButtonWithMemo
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}
                    title={"Active"}
                />
                <ButtonWithMemo
                    size={"small"}
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}
                    title={"Completed"}
                />
            </div>
        </div>
    );
});


export default TodolistWithRedux;
