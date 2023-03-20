import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    console.log(title)
    // const ref = useRef<HTMLInputElement>(null)

    let tasksList = props.tasks.length  //список лишек
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskStatus(task.id, e.currentTarget.checked)
            }
            const taskClasses = task.isDone ? "task-done" : "task"

            return (
                <li key={task.id} className={taskClasses}>
                    <input
                        onChange={changeTaskStatus}
                        type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>


    const addTask = () => {
        const trimmedTitle = title.trim()
        trimmedTitle !== "" ? props.addTask(title) : setError(true)

        setTitle("")
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const handlerCreator = (filter: FilterValuesType) => (): void => props.changeFilter(filter)
    const errorMessage = error && <p style={{color: "red", fontWeight: "bold", margin: "0"}}>Title is required </p>
    const inputErrorClasses = error ? "input-error" : ""
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={inputErrorClasses}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}

            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={handlerCreator("all")}>All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={handlerCreator("active")}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={handlerCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;

