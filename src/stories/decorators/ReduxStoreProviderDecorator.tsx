import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolist1", title: "Based skills", filter: "all"},
        {id: "todolist2", title: "Dop skills", filter: "all"}
    ],
    tasks: {
        ["todolist1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolist2"]: [
            {id: v1(), title: "MaterialUI", isDone: true},
            {id: v1(), title: "Storybook", isDone: false}
        ],
    }
}

export const StoreForStorybook = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={StoreForStorybook}>{storyFn()}</Provider>
}

