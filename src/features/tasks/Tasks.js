import React from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import {selectGoals} from "../goals/goalsSlice";
import {resetTasks, selectTasks, fetchTasks} from "./tasksSlice";
import {selectTodos} from "../todos/todosSlice";
import {removeTask, deleteTask} from "./tasksSlice";
import {removeTaskFromGoals} from "../goals/goalsSlice";
import {addTodo} from "../todos/todosSlice";
import {removeTodo} from "../todos/todosSlice";
import ROUTES from "../../app/routes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import '../../app/App.css';

export default function Tasks() {
    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {goalId} = useParams();
    const goal = goals[goalId];


    useEffect(() => {
        console.log(goalId)
        dispatch(resetTasks());
        dispatch(fetchTasks(goalId));
      }, []); 

    console.log(tasks)
 
    function handleRemoveTask(id){
        dispatch(removeTask({id}));
        dispatch(removeTaskFromGoals({id}));
        dispatch(removeTodo({id}));
        dispatch(deleteTask(id));
    }

    function handleAddTodo(id) {
        dispatch(addTodo({id, goalId}));

        navigate(ROUTES.todoRoute());
    }

    return (
        <section className="goal-list">
        <h1 className="page-heading">Tasks for "{goal.name}"</h1> 
        <div className="table-container">
            <table className="goal-table">
                <thead>
                <tr>
                    <th className="rounded-top-left">Name</th>
                    <th>Resources</th>
                    <th className="rounded-top-right">Notes</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
            {Object.values(tasks).map((task) => {
                if (task) {
                return (
                    <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.resources}</td>
                    <td>{task.notes}</td>
                    <td>
                        <button onClick={() => {handleAddTodo(task.id)}} className="task-button">Add To-do</button>
                        <button onClick={() => {handleRemoveTask(task.id)}} className="remove-button">x</button>
                       
                    </td>
                    </tr>
                )}
          
                return null;
                })}
                </tbody>
            </table>

            <Link to={ROUTES.newTaskRoute(goalId)} className="custom-link">
                <button className="custom-button">Create Task</button>
            </Link>          
    </div>
    </section>
    )
}