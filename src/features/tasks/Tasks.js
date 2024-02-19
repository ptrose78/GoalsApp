import React from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {selectGoals} from "../goals/goalsSlice";
import ROUTES from "../../app/routes";
import { Link } from "react-router-dom";

export default function Tasks() {
    const goals = useSelector(selectGoals);
    const {goalId} = useParams();
    const goal = goals[goalId];
   

    return (
        <section>
            <h2>Goal: {goal.name}</h2>
            <h3>Task List</h3>
            <Link to={ROUTES.newTaskRoute(goalId)}>
            <button>Create Task</button>
            </Link>
        </section>
    )
}