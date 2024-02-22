import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import {selectGoals} from "./goalsSlice"
import {removeGoal} from "./goalsSlice"

export default function Goals() {

    const goals = useSelector(selectGoals);
    const dispatch = useDispatch();

    function handleRemoveGoal(id) {
        dispatch(removeGoal({id}))
    }

return (
    <section>
        <ul>
            {Object.values(goals).map((goal) => 
            <>
            <Link key={goal.id} to={ROUTES.goalRoute(goal.id)}>
                <li className="goal">
                    {goal.name} {goal.date}
                    <button>Tasks List</button>
                </li>
            </Link>
             <button onClick={()=>{handleRemoveGoal(goal.id)}}>X</button>
             </>
            )}
        </ul>
            
        <Link to={ROUTES.newGoalRoute()}>
            Create New Goal
        </Link>   
    </section>    
)}
