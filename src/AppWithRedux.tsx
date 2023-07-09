import React, {useState} from "react";
import {TaskType} from "./TodolistWithRedux";
import "./App.css";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import TodolistWithRedux from "./TodolistWithRedux";

export type FilterValuesType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function AppWithRedux(): JSX.Element {

    let todoLists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const dispatch = useDispatch()

    // const removeTask = (taskId: string, todoListId: string) => {
    //     dispatch(removeTaskAC(taskId, todoListId))
    // }
    // const addTask = (title: string, todoListId: string) => {
    //     dispatch(addTaskAC(title, todoListId))
    // }
    // const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
    //     dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    // }
    // const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
    //     dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    // }
    //
    // const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    //     dispatch(changeTodolistFilterAC(todoListId, filter))
    // }
    // const removeTodoList = (todoListId: string) => {
    //     let action = removeTodolistAC(todoListId)
    //     dispatch(action)
    // }
    // const changeTodoListTitle = (newTitle: string, todoListId: string) => {
    //     dispatch(changeTodolistTitleAC(newTitle, todoListId))
    // }

    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }


    const todoListsComponents = todoLists.map(tl => {
        return (
            <Grid key={tl.id} item>
                <Paper elevation={8}>
                    <TodolistWithRedux
                        todoListId={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                    />
                </Paper>
            </Grid>
        )
    })

    const mode = isDarkMode ? "dark" : "light"
    const customTheme = createTheme({
        palette: {
            primary: {
                main: "#a5d6a7",
            },
            secondary: {
                main: "#00897b",
            },
            mode: mode
        }
    })

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline>
                <div className="App">
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{mr: 2}}>
                                <Menu/>
                            </IconButton>
                            <Typography
                                variant="h6"
                                sx={{flexGrow: 1}}
                                component="div">
                                TodoLists
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
                                    label={isDarkMode ? "Light mode" : "Dark mode"}
                                />
                            </FormGroup>

                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                    <Container fixed>
                        <Grid container sx={{p: "15px 0"}}>
                            <AddItemForm addItem={addTodoList} recommendedTitleLength={15} maxTitleLength={20}/>
                        </Grid>
                        <Grid container spacing={4}>
                            {todoListsComponents}
                        </Grid>
                    </Container>
                </div>
            </CssBaseline>
        </ThemeProvider>

    );
}

export default AppWithRedux;