import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {TaskType} from "../TodolistWithRedux";


const meta: Meta<typeof TaskWithRedux> = {
    title: "TODOLIST/TaskWithRedux",
    component: TaskWithRedux,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    decorators: [ReduxStoreProviderDecorator],
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const TaskWithReduxPresent = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolist2"][0])
    if (!task) task = {id: "DefaultTaskId", title: "Default task", isDone: false}
    return <TaskWithRedux task={task} todolistId={"todolist2"}/>
}
export const TaskWithReduxStory: Story = {
    render: () => <TaskWithReduxPresent/>
};


