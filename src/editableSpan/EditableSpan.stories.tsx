import type {Meta, StoryObj} from "@storybook/react";
import React, {useState} from "react";
import {EditableSpan} from "./EditableSpan";
import {action} from "@storybook/addon-actions";


const meta: Meta<typeof EditableSpan> = {
    title: "TODOLIST/EditableSpan",
    component: EditableSpan,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        title: {
            description: "EditableSpan",
        },
        changeTitle: {
            description: "Value EditableSpan changed",
            action: "EditableSpan changed"
        }
    },
    args: {
        title: "Default Value",
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;
export const EditableSpanWithoutSavedValue: Story = {}

const EditableSpanWithSavedValue = (props: { title: string, onChange: () => void }) => {
    const [title, setTitle] = useState(props.title)
    const changeTitle = (newValue: string) => {
        setTitle(newValue)
        props.onChange()
    }
    return <EditableSpan title={title} changeTitle={changeTitle}/>
}

export const EditableSpanWithSavedValueStory: Story = {
    render: (args) => <EditableSpanWithSavedValue title={args.title} onChange={action("EditableSpan changed")}/>
}

