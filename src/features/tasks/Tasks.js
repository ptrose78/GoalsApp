import React from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {selectGoals} from "../goals/goalsSlice";
import {selectTasks} from "./tasksSlice";
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";

//state.goals = produce((state, draft => {draft.goals = Object.values(draft.goals).filter(goal => {console.log(goal.id)})}))
			//state.goals = newState;

export default function Tasks() {
    const goals = useSelector(selectGoals);
    const {goalId} = useParams();
    const goal = goals[goalId];

    const tasks = useSelector(selectTasks); 

    return (
        <section>
            <h2>Goal: {goal.name}</h2>
            <h3>Task List</h3>
            <p>{goal.taskIds.map((taskId)=>
                (<li>{tasks[taskId].name}</li>))}
            </p>
            <Link to={ROUTES.newTaskRoute(goalId)}>
            <button>Create Task</button>
            </Link>
        </section>
    )
}