import {FilterValuesType, TodolistType,} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>



type TodolistReducerType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

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


export const removeTodolistAC = (id: string) => {
    return {type: "REMOVE-TODOLIST", payload: {id} } as const
}

export const addTodolistAC = (title: string) => {
    return {type: "ADD-TODOLIST", payload: {title, todolistId: v1()} } as const
}

export const changeTodolistTitleAC = (title: string, todolistId: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", payload: {title, todolistId} } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {type: "CHANGE-TODOLIST-FILTER", payload: {todolistId, filter} } as const
}