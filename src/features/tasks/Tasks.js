import React from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {selectGoals} from "../goals/goalsSlice";
import {selectTasks} from "./tasksSlice";
import {selectTodos} from "../todos/todosSlice";
import {removeTask} from "./tasksSlice";
import {removeTaskFromGoals} from "../goals/goalsSlice";
import {addTodo} from "../todos/todosSlice";
import {linkTaskToTodo} from "../todos/todosSlice";
import ROUTES from "../../app/routes";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {v4 as uuidv4} from "uuid";

export default function Tasks() {
    const goals = useSelector(selectGoals);
    const tasks = useSelector(selectTasks);
    const todos = useSelector(selectTodos);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {goalId} = useParams();
    const goal = goals[goalId];

    function handleRemoveTask(id){
        dispatch(removeTask({id}));
        dispatch(removeTaskFromGoals({id}));
    }

    function handleAddTodo(taskId) {
        const id = uuidv4();
        dispatch(addTodo({id}));

        dispatch(linkTaskToTodo({taskId, id}));
        navigate(ROUTES.todoRoute());
    }

    return (
        <section>
            <h2>Goal: {goal.name}</h2>
            <h3>Task List</h3>
            <p>{goal.taskIds.map((taskId)=>{
                 const task = tasks[taskId];
                 if (task) {
                    return (<li key={taskId}>
                                {task.name}
                                <button onClick={()=>{handleRemoveTask(task.id)}}>x</button>
                                <button onClick={()=>{handleAddTodo(task.id)}}>+</button>
                            </li>);
                }
            })
            }
            </p>
            <Link to={ROUTES.newTaskRoute(goalId)}>
            <button>Create Task</button>
            </Link>
        </section>
    )
}