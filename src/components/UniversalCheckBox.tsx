import React, {ChangeEvent, memo} from "react";
import {Checkbox} from "@mui/material";

type CheckBoxType = {
    isDone: boolean
    callBack: (isDone: boolean) => void
}
export const UniversalCheckBox: React.FC<CheckBoxType> = memo(({isDone, callBack}) => {
    console.log("Checkbox")

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
})