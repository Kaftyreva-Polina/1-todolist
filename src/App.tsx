import React, {useEffect, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const todoListTitle_1: string = "What to learn"
    // const todoListTitle_2: string = "What to buy"

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false},
    ])
    // const tasks = result[0]
    // const setTasks = result[1]
    // console.log(result)
    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId))
        console.log(tasks)
    }
    useEffect(() => {
        console.log(tasks)
    }, [tasks]) //Для синхронизации для устранения ассинхронизации useState

    const [filter, setFilter] = useState<FilterValuesType>("all") //useState даст нам новый массив после выбора фильтрации
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    } //Сразу добавляем в TodoListPropsType

    const getFilteredTasksForRender = //функция сама отфильтрует по выбранным параметрам нужный список тасок
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "active":
                    return tasks.filter(task => task.isDone === false)
                case "completed":
                    return tasks.filter(task => task.isDone === true)
                default:
                    return tasks
            }
        }

    const filteredTaskForRender = getFilteredTasksForRender(tasks, filter) //конкретные таски и значение фильтра
    // const tasks_2: Array<TaskType> = [
    //     {id: 1, title: "Meat", isDone: true},
    //     {id: 2, title: "Fruit", isDone: false},
    //     {id: 3, title: "Veggies", isDone: false},
    // ]

    return (
        <div className="App">
            <Todolist
                title={todoListTitle_1}
                tasks={filteredTaskForRender} //Передаем не все таски, а только отильтрованные
                removeTask={removeTask}
                changeFilter={changeFilter} // Передаем т к в App.tsx  такой тип записи
            />
            {/*<Todolist title={todoListTitle_2} tasks={tasks_2}/>*/}
        </div>
    );
}

//
export default App;
