import {TasksStateType} from "../AppWithRedux";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";


export type removeTaskActionType = ReturnType<typeof removeTaskAC>
export type addTaskActionType = ReturnType<typeof addTaskAC>
export type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType
    | changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(el => el.id !== action.payload.taskId)}
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        case "CHANGE-TASK-STATUS":
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ?{...el, isDone: action.payload.isDone}: el)
            }
        case "CHANGE-TASK-TITLE":
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(el => el.id === action.payload.taskId ? {...el, title: action.payload.title} : el)
            }
        case "ADD-TODOLIST":
            return {...state,
                [action.payload.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let {[action.payload.id]: [], ...rest} = state
            return rest
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', payload:{taskId, todolistId}} as const
}
export const addTaskAC = (title: string, todolistId: string)=> {
    return { type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", payload: {taskId, isDone, todolistId}} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", payload: {taskId, title, todolistId}} as const
}

