import React from "react";
import { UseDispatch, useSelector } from "react-redux";
import {selectTodos} from "./todosSlice";
import {selectTasks} from "../tasks/tasksSlice"

export default function Todos () {
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);


    return (
        <section>
            <h2>Todos</h2>
            {Object.values(todos).map((todo)=>{
                return (todo.taskIds).map((todoTaskId)=>{
                    return Object.values(tasks).map((task)=>{
                        if (todoTaskId === task.id) {
                           return (<li key={todoTaskId}>
                                    {task.name}
                                    <button>x</button>
                                  </li>
                           )
                        }})
                    })
                }
            )}
        </section>
    )
}
