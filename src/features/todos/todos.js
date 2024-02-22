import React from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {selectTodos} from "./todosSlice";
import {removeTodo, removeTaskFromTodo} from "./todosSlice";
import {selectTasks} from "../tasks/tasksSlice"

export default function Todos () {
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    function handleRemoveTodo(id) {
        dispatch(removeTodo({id}));
        dispatch(removeTaskFromTodo({id}));
    }

    return (
        <section>
            <h2>Todos</h2>
            {Object.values(todos).map((todo)=>{
                return (todo.taskIds).map((todoTaskId)=>{
                    return Object.values(tasks).map((task)=>{
                        if (todoTaskId === task.id) {
                           return (<li key={todoTaskId}>
                                    {task.name}
                                    <button onClick={()=>{handleRemoveTodo(todoTaskId)}}>x</button>
                                  </li>
                           )
                        }})
                    })
                }
            )}
        </section>
    )
}
