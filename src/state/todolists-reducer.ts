import {FilterValuesType, TodolistType,} from "../App";

export const todolistsReducer = (state: Array<TodolistType>, action: TodolistReducerType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.payload.id)
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"}
            return [...state, newTodolist]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.todolistId
                ? {...el, title: action.payload.title}
                : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.todolistId
                ? {...el, filter: action.payload.filter}
                : el)
        }
        default:
            return state
    }
}
type TodolistReducerType = RemoveTodolistACType | AddTodolistACType | ChangeTodolistTitleType | ChangeTodolistFilterType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {id}
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {title, todolistId}
    } as const
}

type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {title, todolistId}
    } as const
}

type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {todolistId, filter}
    } as const
}