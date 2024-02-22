import React from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {selectGoals} from "../goals/goalsSlice";
import {selectTasks} from "./tasksSlice";
import {removeTask} from "./tasksSlice";
import {removeTaskFromGoals} from "../goals/goalsSlice";
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";

export default function Tasks() {
    const goals = useSelector(selectGoals);
    const tasks = useSelector(selectTasks);

    const dispatch = useDispatch();
    const {goalId} = useParams();
    const goal = goals[goalId];

    function handleRemoveTask(id){
        dispatch(removeTask({id}));
        dispatch(removeTaskFromGoals({id}));
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