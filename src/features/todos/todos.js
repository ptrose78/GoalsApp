import React from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {selectTodos} from "./todosSlice";
import {removeTodo} from "./todosSlice";
import {selectTasks} from "../tasks/tasksSlice";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";


export default function Todos () {
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);

    const dispatch = useDispatch();

    function handleRemoveTodo(id) {
        dispatch(removeTodo({id}));
    }

    return (
        Object.keys(todos).length !== 0 ? (
            <section className="goal-list">
            <div className="table-container">
            {todos.length !== 0 && (
                <table className="goal-table">
                <thead>
                    <tr>
                    <th colSpan="2">Todos</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                    return Object.values(tasks).map((task) => {
                        if (todo.id === task.id) {
                        return (
                            <tr key={todo.id}>
                            <td>{task.name}</td>
                            <td>
                                <button onClick={() => { handleRemoveTodo(todo.id) }} className="remove-button">x</button>
                            </td>
                            </tr>
                        );
                        }
                        return null;
                    });
                    })}
                </tbody>
                </table>
            )}
            </div>
            </section>
            ) : (
                <>
                <div style={{ textAlign: 'center' }}>
                <h2>Oops, You have not created a to-do yet!</h2>
                <Link to={ROUTES.goalsRoute()} className="custom-link">
                    <button className="custom-button">Go to Goals List</button>
                </Link>
                </div>
                </>
            )
    )  
}
