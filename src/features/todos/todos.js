import React, { useEffect } from "react";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import {fetchTodos, selectTodos} from "./todosSlice";
import {deleteTodo, removeTodo} from "./todosSlice";
import {selectTasks} from "../tasks/tasksSlice";
import {selectGoals} from "../goals/goalsSlice";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";

  
export default function Todos () {
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);
    const goals = useSelector(selectGoals);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodos());
    }, []);

    function handleRemoveTodo(id) {
        dispatch(removeTodo({id}));
        dispatch(deleteTodo(id));
    }

    return (
        Object.keys(todos).length !== 0 ? (
            <section className="goal-list">
            <h1 className="page-heading">To-do List</h1> 
            <div className="table-container">
            {Object.values(todos).length !== 0 && (
                <table className="goal-table">
                <thead>
                <tr>
                    <th className="rounded-top-left">Name</th>
                    <th>Resources</th>
                    <th>Notes</th>
                    <th>Goal</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {Object.values(todos).map((todo) => {
                    if (todo) {
                        return (
                            <tr key={todo.id}>
                            <td>{todo.name}</td>
                            <td>{todo.resources}</td>
                            <td>{todo.notes}</td>
                            <td>{todo.goal}</td>
                            <td>
                                <button onClick={() => { handleRemoveTodo(todo.id) }} className="remove-button">x</button>
                            </td>
                            </tr>
                        )}
                    return null;
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
