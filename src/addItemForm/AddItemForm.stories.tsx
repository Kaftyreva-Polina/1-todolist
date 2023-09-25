import type {Meta, StoryObj} from "@storybook/react";
import AddItemForm, {AddItemFormPropsType} from "./AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {action} from "@storybook/addon-actions"


const meta: Meta<typeof AddItemForm> = {
    title: "TODOLIST/AddItemForm",
    component: AddItemForm,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        addItem: {
            description: "Button clicked inside form",
            action: "Button clicked"
        }
    },
    args: {
        maxTitleLength: 12,
        recommendedTitleLength: 7
    }
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};


const AddItemFormWithError = (props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(true)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const isAddTaskNotPossible: boolean = !title.length || title.length > props.maxTitleLength || error
    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const longTitleWarningMessage = (title.length > props.recommendedTitleLength && title.length <= props.maxTitleLength) &&
        <span style={{color: "black"}}>Title should be shorter</span>
    const longTitleErrorMessage = title.length > props.maxTitleLength &&
        <span style={{color: "#ff0000"}}>Title is too long</span>
    const errorMessage = error && "Title is required!"

    return (
        <div className="add-form">
            <TextField
                size="small"
                placeholder="Enter item title, please"
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskHandler}
                error={error}
                helperText={errorMessage || longTitleWarningMessage || longTitleErrorMessage}
            />
            <IconButton
                size="small"
                disabled={isAddTaskNotPossible}
                onClick={addTaskHandler}
            ><AddBoxIcon/>
            </IconButton>
        </div>
    );
}

export const AddItemFormWithErrorStory: Story = {
    render: (args) => <AddItemFormWithError addItem={action("Button clicked")}
                                            recommendedTitleLength={args.recommendedTitleLength}
                                            maxTitleLength={args.maxTitleLength}/>
}


