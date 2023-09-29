import type {Meta, StoryObj} from "@storybook/react";
import React from "react";
import {TaskWithRedux} from "./TaskWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";


const meta: Meta<typeof TaskWithRedux> = {
    title: "TODOLIST/TaskWithRedux",
    component: TaskWithRedux,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],

};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;


export const TaskWithReduxStory: Story = {
    render: args => <Provider store={store}>{}</Provider>
};


