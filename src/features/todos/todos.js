import React from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {selectTodos} from "./todosSlice";
import {removeTodo} from "./todosSlice";
import {selectTasks} from "../tasks/tasksSlice";

export default function Todos () {
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);

    const dispatch = useDispatch();

    function handleRemoveTodo(id) {
        dispatch(removeTodo({id}));
    }

    return (
        <section>
            {todos.length !== 0 && <h2>Todos</h2>}
            
            {todos.map((todo)=>{
                return Object.values(tasks).map((task)=>{
                    if (todo.id === task.id) {
                        return (<li key={todo}>
                                {task.name}
                                    <button onClick={()=>{handleRemoveTodo(todo.id)}}>x</button>
                                </li>
                           )
                        }})
                    })
            }
        </section>
    )
}
