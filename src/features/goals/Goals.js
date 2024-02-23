import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ROUTES from "../../app/routes";
import {Link} from "react-router-dom";
import {selectGoals} from "./goalsSlice"
import {selectTodos} from "../todos/todosSlice"
import {removeGoal} from "./goalsSlice";
import {removeTodo} from "../todos/todosSlice"
import { Outlet, NavLink } from "react-router-dom";

export default function Goals() {

    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);
 
    const dispatch = useDispatch();

    function handleRemoveGoal(id) {
        dispatch(removeGoal({id}));
        //dispatch(removeTodo({todosId}))
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
        
        {Object.values(goals).length !== 0 ? (
            <Link to={ROUTES.newGoalRoute()}>
                Create New Goal
            </Link>
            ) : (
            null
            )
        }
    </section>    
)}
