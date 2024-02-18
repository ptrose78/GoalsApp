import React from "react";
import {useSelector} from "react-redux";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import {selectGoals} from "./goalsSlice"

export default function Goals() {
    const goals = useSelector(selectGoals);
    console.log(goals)

return (
    <section>
        <ul>
            {Object.values(goals).map((goal) => 
            (<Link key={goal.id} to={ROUTES.goalRoute(goal.id)}>
                <li className="goal">
                    {goal.name} {goal.date}
                    <button>Tasks List</button>
                </li>
            </Link>
            ))}
        </ul>
            
        <Link to={ROUTES.newGoalRoute()}>
            Create New Goal
        </Link>   
    </section>    
)}
