import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {selectGoals} from "../features/goals/goalsSlice"


export default function AppLayout() {
    const goals = useSelector(selectGoals);
    console.log(goals)

    return (
        <div>    
            <nav>
                <ul>
                {Object.keys(goals).length === 0 ? (
                    <li> 
                        <NavLink to={ROUTES.newGoalRoute()} >
                        Create a Goal
                        </NavLink>
                    </li>
                ) : (
                    <li> 
                        <NavLink to={ROUTES.goalsRoute()} >
                         Goals
                        </NavLink>
                    </li>
                )}
                </ul>
            </nav>
            <Outlet/>
        </div>
    );
}