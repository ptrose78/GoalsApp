import React from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {selectGoals} from "../goals/goalsSlice";
import {selectTasks} from "./tasksSlice";
import {selectTodos} from "../todos/todosSlice";
import {removeTask} from "./tasksSlice";
import {removeTaskFromGoals} from "../goals/goalsSlice";
import {addTodo} from "../todos/todosSlice";
import {removeTodo} from "../todos/todosSlice";
import {linkTaskToTodo, removeTaskFromTodo} from "../todos/todosSlice";
import {linkTodoToGoal} from "../goals/goalsSlice";
import ROUTES from "../../app/routes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import '../../app/App.css';

export default function Tasks() {
    const goals = useSelector(selectGoals);
    const tasks = useSelector(selectTasks);
    const todos = useSelector(selectTodos);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {goalId} = useParams();
    console.log(goalId)
    console.log(goals)
    const goal = goals[goalId];
    console.log(goals[goalId])
    console.log(goal)
   

    function handleRemoveTask(id){
        dispatch(removeTask({id}));
        dispatch(removeTaskFromGoals({id}));
        dispatch(removeTodo({id}))
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
            {goal.taskIds.map((taskId) => {
                const task = tasks[taskId];
                if (task) {
                return (
                    <tr key={taskId}>
                    <td>{task.name}</td>
                    <td>{task.resources}</td>
                    <td>{task.notes}</td>
                    <td>
                        <button onClick={() => { handleAddTodo(task.id) }} className="task-button">Add To-do</button>
                        <button onClick={() => { handleRemoveTask(task.id) }} className="remove-button">x</button>
                       
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