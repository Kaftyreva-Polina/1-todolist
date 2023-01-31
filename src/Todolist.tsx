import React, {ChangeEvent, useRef, useState, KeyboardEvent} from 'react';
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState<string>('')
    console.log(title)
    // const ref = useRef<HTMLInputElement>(null)

    let tasksList = props.tasks.length  //список лишек
        ? props.tasks.map((task: TaskType) => {
            const removeTask = () => props.removeTask(task.id)
            return (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>


    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()


    // const onClickHandlerAll = () => props.changeFilter("all")
    // const onClickHandlerActive = () => props.changeFilter("active")
    // const onClickHandlerCompleted = () => props.changeFilter("completed")

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTask}>+</button>

                {/*<input*/}
                {/*    ref={ref}*/}
                {/*/>*/}
                {/*<button onClick={() => {*/}
                {/*    if(ref.current) {*/}
                {/*        props.addTask(ref.current.value)*/}
                {/*        ref.current.value = ""*/}
                {/*    }*/}
                {/*}}>+</button>*/}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={handlerCreator('all')}>All</button>
                <button onClick={handlerCreator('active')}>Active</button>
                <button onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;

