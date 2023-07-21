import React, {memo} from "react";
import {ButtonProps} from "@mui/material/Button/Button";
import {Button} from "@mui/material";

export const ButtonWithMemo = memo((props: ButtonProps) => {
    return <Button
        size={props.size}
        variant={props.variant}
        disableElevation
        color={props.color}
        onClick={props.onClick}
    >{props.title}
    </Button>
})