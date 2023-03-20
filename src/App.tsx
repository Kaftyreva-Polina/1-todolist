import React, {useState} from "react";
import "./App.css";
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    console.log(v1())
    const todoListTitle_1: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false},
    ])


    // useEffect(() => {
    //     console.log(tasks)
    // }, [tasks])

    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        console.log(tasks)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        setTasks(tasks.map((t) => t.id === taskId ? {...t, isDone: isDone} : t))
    }
    const getFilteredTasksForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "active":
                    return tasks.filter(task => !task.isDone)
                case "completed":
                    return tasks.filter(task => task.isDone)
                default:
                    return tasks
            }
        }

    const filteredTaskForRender = getFilteredTasksForRender(tasks, filter)

    return (
        <div className="App">
            <Todolist
                title={todoListTitle_1}
                tasks={filteredTaskForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                filter={filter}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}


export default App;
