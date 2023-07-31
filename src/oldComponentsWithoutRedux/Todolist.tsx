import React from "react";
// import {FilterValuesType} from "./App";
// import AddItemForm from "./AddItemForm";
// import EditableSpan from "./EditableSpan";
// import {Button, IconButton, List, ListItem, Typography} from "@mui/material";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import {UniversalCheckBox} from "./components/UniversalCheckBox";
//
// type TodolistPropsType = {
//     todoListId: string
//     title: string
//     tasks: Array<TaskType>
//     filter: FilterValuesType
//     removeTask: (taskId: string, todoListId: string) => void
//     changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
//     changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
//     changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
//     addTask: (title: string, todoListId: string) => void
//     removeTodoList: (todoListId: string) => void
//     changeTodoListTitle: (todoListId: string, newValue: string) => void
// }
//
// export type TaskType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// const TodoList: FC<TodolistPropsType> = (props) => {
//
//     let isAllTasksNotIsDone = true
//     for (let i = 0; i < props.tasks.length; i++) {
//         if (props.tasks[i].isDone) {
//             isAllTasksNotIsDone = false
//             break;
//         }
//     }
//
//     const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"
//     const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
//         const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
//         // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
//         const changeTaskTitle = (newTitle: string) => props.changeTaskTitle(task.id, newTitle, props.todoListId)
//         const changeStatusHandler = (taskId: string, newIsDone: boolean) => {
//             props.changeTaskStatus(taskId, newIsDone, props.todoListId)
//         }
//         return (
//             <ListItem
//                 key={task.id}
//                 divider
//                 disablePadding
//                 secondaryAction={
//                     <IconButton
//                         size="small"
//                         onClick={removeTaskHandler}><DeleteForeverIcon/>
//                     </IconButton>
//                 }
//             >
//                 <UniversalCheckBox isDone={task.isDone} callBack={(isDone) => changeStatusHandler(task.id, isDone)}/>
//                 {/*<Checkbox*/}
//                 {/*    color="secondary"*/}
//                 {/*    edge="start"*/}
//                 {/*    onChange={changeTaskStatus}*/}
//                 {/*    checked={task.isDone}*/}
//                 {/*/>*/}
//                 <EditableSpan title={task.title}
//                               changeTitle={changeTaskTitle}
//                               classes={task.isDone ? "task-done" : "task"}
//                 />
//             </ListItem>
//         )
//     })
//
//     const addTask = (title: string) => {
//         props.addTask(title, props.todoListId)
//     }
//
//     const removeTodoList = () => props.removeTodoList(props.todoListId)
//     const changeTodolistTitle = (title: string) => props.changeTodoListTitle(props.todoListId, title)
//     return (
//         <div className={todoClasses}>
//             <Typography
//                 variant="h5"
//                 align="center"
//                 // fontWeight="bold"
//                 gutterBottom
//             >
//                 <EditableSpan title={props.title}
//                               changeTitle={changeTodolistTitle}/>
//                 <Button
//                     variant="contained"
//                     endIcon={<DeleteForeverIcon/>}
//                     sx={{ml: "15px"}}
//                     size="small"
//                     onClick={removeTodoList}>Del
//                 </Button>
//             </Typography>
//             <AddItemForm addItem={addTask}
//                          maxTitleLength={15}
//                          recommendedTitleLength={20}/>
//             <List>
//                 {todoListItems}
//             </List>
//             <div className={"btn-filter-container"}>
//                 <Button
//                     size="small"
//                     variant="contained"
//                     disableElevation
//                     color={props.filter === "all" ? "secondary" : "primary"}
//                     // className={props.filter === "all" ? "btn-active" : ""}
//                     onClick={() => {
//                         props.changeTodoListFilter("all", props.todoListId)
//                     }}
//                 >All
//                 </Button>
//                 <Button
//                     size="small"
//                     variant="contained"
//                     disableElevation
//                     color={props.filter === "active" ? "secondary" : "primary"}
//                     // className={props.filter === "active" ? "btn-active" : ""}
//                     onClick={() => {
//                         props.changeTodoListFilter("active", props.todoListId)
//                     }}
//                 >Active
//                 </Button>
//                 <Button
//                     size="small"
//                     variant="contained"
//                     disableElevation
//                     color={props.filter === "completed" ? "secondary" : "primary"}
//                     // className={props.filter === "completed" ? "btn-active" : ""}
//                     onClick={() => {
//                         props.changeTodoListFilter("completed", props.todoListId)
//                     }}
//                 >Completed
//                 </Button>
//             </div>
//         </div>
//     );
// };
//
// export default TodoList;
