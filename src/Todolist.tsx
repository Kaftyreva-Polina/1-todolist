import React from 'react';

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}
const Todolist = (props: TodolistPropsType) => {
    // let tasksList;
    // if(props.tasks.length === 0){
    //     tasksList = <span>Your taskslist is empty</span>
    // } else {
    //     tasksList = props.tasks.map((task:TaskType) => {
    //         return (
    //             <li>
    //                 <input type="checkbox" checked={task.isDone}/>
    //                 <span>{task.title}</span>
    //             </li>
    //         )
    //     })
    // }

    let tasksList = props.tasks.length
        ? props.tasks.map((task: TaskType) => {
            return (
                <li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                </li>
            )
        })
        : <span>Your taskslist is empty</span>

    // props.tasks.length


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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;


// <li>
//     <input type="checkbox" checked={props.tasks[0].isDone}/>
//     <span>{props.tasks[0].title}</span>
// </li>
// <li>
//     <input type="checkbox" checked={props.tasks[1].isDone}/>
//     <span>{props.tasks[1].title}</span>
// </li>
// <li>
//     <input type="checkbox" checked={props.tasks[2].isDone}/>
//     <span>{props.tasks[2].title}</span>
// </li>