import React from "react";
// import React, {useState} from "react";
// import Todolist, {TaskType} from "./Todolist"; //!
// import "./App.css";
// import {v1} from "uuid";
// import AddItemForm from "./AddItemForm";
// import {
//     AppBar,
//     Button, Checkbox,
//     Container,
//     createTheme,
//     CssBaseline, FormControlLabel, FormGroup,
//     Grid,
//     IconButton,
//     Paper,
//     ThemeProvider,
//     Toolbar,
//     Typography
// } from "@mui/material";
// import {Menu} from "@mui/icons-material";
//
// export type FilterValuesType = "all" | "active" | "completed"
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
//
// export type TasksStateType = {
//     [todoListId: string]: Array<TaskType>
// }
//
// function App(): JSX.Element {
//     const todoListId_1 = v1()
//     const todoListId_2 = v1()
//     const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
//         {id: todoListId_1, title: "What to learn", filter: "all"},
//         {id: todoListId_2, title: "What to buy", filter: "all"},
//     ])
//     const [tasks, setTasks] = useState<TasksStateType>({
//         [todoListId_1]: [
//             {id: v1(), title: "HTML & CSS", isDone: true},
//             {id: v1(), title: "CSS & SCSS", isDone: true},
//             {id: v1(), title: "ES6/TS", isDone: false},
//             {id: v1(), title: "REDUX", isDone: false}
//         ],
//         [todoListId_2]: [
//             {id: v1(), title: "Water", isDone: false},
//             {id: v1(), title: "Bread", isDone: false},
//             {id: v1(), title: "Salt", isDone: false}
//         ]
//     })
//     const [isDarkMode, setDarkMode] = useState<boolean>(false)
//     const removeTask = (taskId: string, todoListId: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)})
//     }
//     const addTask = (title: string, todoListId: string) => {
//         const newTask: TaskType = {id: v1(), title, isDone: false}
//         setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
//     }
//     const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})
//     }
//     const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
//         setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
//     }
//
//     const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
//         setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
//     }
//     const removeTodoList = (todoListId: string) => {
//         setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
//         delete tasks[todoListId]
//     }
//     const changeTodoListTitle = (newTitle: string, todoListId: string) => {
//         setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, title: newTitle} : t))
//     }
//     const addTodoList = (title: string) => {
//         const newTodoList: TodolistType = {
//             id: v1(), title: title, filter: "all"
//         }
//         setTodoLists([...todoLists, newTodoList])
//         setTasks({[newTodoList.id]: [], ...tasks})
//     }
//
//     const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
//         switch (filterValue) {
//             case "active":
//                 return tasksList.filter(t => !t.isDone)
//             case "completed":
//                 return tasksList.filter(t => t.isDone)
//             default:
//                 return tasksList
//         }
//     }
//
//
//     const todoListsComponents = todoLists.map(tl => {
//         const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
//         return (
//             <Grid item>
//                 <Paper elevation={8}>
//                     <Todolist
//                         key={tl.id}
//
//                         todoListId={tl.id}
//                         title={tl.title}
//                         tasks={tasksForRender}
//                         filter={tl.filter}
//
//                         removeTask={removeTask}
//                         addTask={addTask}
//                         changeTaskStatus={changeTaskStatus}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodoListFilter={changeTodoListFilter}
//                         removeTodoList={removeTodoList}
//                         changeTodoListTitle={changeTodoListTitle}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     const mode = isDarkMode ? "dark" : "light"
//     const customTheme = createTheme({
//         palette: {
//             primary: {
//                 main: "#a5d6a7",
//             },
//             secondary: {
//                 main: "#00897b",
//             },
//             mode: mode
//         }
//     })
//
//     return (
//         <ThemeProvider theme={customTheme}>
//             <CssBaseline>
//                 <div className="App">
//                     <AppBar position="static">
//                         <Toolbar>
//                             <IconButton
//                                 size="large"
//                                 edge="start"
//                                 color="inherit"
//                                 aria-label="menu"
//                                 sx={{mr: 2}}>
//                                 <Menu/>
//                             </IconButton>
//                             <Typography
//                                 variant="h6"
//                                 sx={{flexGrow: 1}}
//                                 component="div">
//                                 TodoLists
//                             </Typography>
//                             <FormGroup>
//                                 <FormControlLabel
//                                     control={<Checkbox
//                                         onChange={(e) => setDarkMode(e.currentTarget.checked)}/>}
//                                     label={isDarkMode ? "Light mode" : "Dark mode"}
//                                 />
//                             </FormGroup>
//
//                             <Button color="inherit">Login</Button>
//                         </Toolbar>
//                     </AppBar>
//                     <Container fixed>
//                         <Grid container sx={{p: "15px 0"}}>
//                             <AddItemForm addItem={addTodoList} recommendedTitleLength={15} maxTitleLength={20}/>
//                         </Grid>
//                         <Grid container spacing={4}>
//                             {todoListsComponents}
//                         </Grid>
//                     </Container>
//                 </div>
//             </CssBaseline>
//         </ThemeProvider>
//
//     );
// }
//
// export default App;