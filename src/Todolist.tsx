import React from 'react';
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterValuesType) => void //делаем экспорт из App.tsx
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
const Todolist = (props: TodolistPropsType) => {
    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>


    return (
        <div className="App">
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter("all")}>All</button>
                    <button onClick={() => props.changeFilter("active")}>Active</button>
                    <button onClick={() => props.changeFilter("completed")}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;

