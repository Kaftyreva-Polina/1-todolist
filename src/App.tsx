import React, {useState} from "react";
import "./App.css";
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

type TasksSateType = {
    [todoListId: string]: Array<TaskType>
}

function App(): JSX.Element {
    //BLL
    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksSateType>({
        [todoListId_1]: [
            {id: v1(), title: "HTML CSS", isDone: true},
            {id: v1(), title: "ES6 TS", isDone: true},
            {id: v1(), title: "React Redux", isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Meat", isDone: false}
        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        })

        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== todoListId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }

        setTasks({
            ...tasks,
            todolistId: [newTask, ...tasks[todoListId]]
        })

        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = [newTask, ...tasksForUpdate]
        // const copyTask = {...tasks}
        // copyTask[todoListId] = updatedTasks
        // setTasks(copyTask)

    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            todoListId: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        })

        // const tasksForUpdate = tasks[todoListId]
        // const UpdatedTasks = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        // const copyTask = {...tasks}
        // copyTask[todoListId] = UpdatedTasks
        // setTasks(copyTask)

    }
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId)) //but tasks stay
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)

        // delete tasks[todoListId]  //нарушаем иммутабельность, но не требует доп перерисовка, другой спосо
    }

    const TodoListsComponents = todoLists.map(tl => {
        const filteredTaskForRender = getFilteredTasksForRender(tasks[tl.id], tl.filter)
            return (
                <Todolist
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={filteredTaskForRender}
                    removeTask={removeTask}
                    changeTodoListFilter={changeTodoListFilter}
                    addTask={addTask}
                    filter={tl.filter}
                    changeTaskStatus={changeTaskStatus}
                    removeTodoList={removeTodoList}
                />
            )
        }
    )


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



    return (
        <div className="App">
            {TodoListsComponents}
        </div>
    );
}


export default App;
