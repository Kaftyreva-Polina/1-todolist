import React, {ChangeEvent} from "react";
import {Checkbox} from "@mui/material";

type CheckBoxType = {
    isDone: boolean
    callBack: (isDone: boolean) => void
}
export const UniversalCheckBox: React.FC<CheckBoxType> = ({isDone, callBack}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }
    return (
        <Checkbox
            color="secondary"
            edge="start"
            onChange={onChangeHandler}
            checked={isDone}
        />
    )
}