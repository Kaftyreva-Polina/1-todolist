import React, {useCallback, useState} from "react";
import TodolistWithRedux, {TaskType} from "./TodolistWithRedux";
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
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])


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