import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import ROUTES from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {selectGoals} from "../features/goals/goalsSlice";
import {selectTodos} from "../features/todos/todosSlice";
import {selectTasks} from "../features/tasks/tasksSlice";
import { useLocation } from 'react-router-dom';


export default function AppLayout() {
    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);
    const location = useLocation();

    return (
        <div> 
            {Object.keys(goals).length !== 0 ? (    
                <nav>
                    <ul>
                    {Object.keys(goals).length !== 0 ? (
                        <li> 
                            <NavLink to={ROUTES.goalsRoute()}>
                                Goals
                            </NavLink>
                        </li>
                    ) : (
                        null
                    )}
   
                    
                    {Object.keys(goals).length !== 0 ? (
                        <li>
                            <NavLink to={ROUTES.todoRoute()}>
                                To-dos
                            </NavLink>
                        </li>
                    ) : (
                            null
                    )}
                    </ul>
                </nav>
            ) : (
            null
            )
        }
            <div className="center-container">
            {Object.keys(goals).length === 0 && location.pathname === ROUTES.homeRoute() ? (
                <Link to={ROUTES.newGoalRoute()} className="homepage-button">
                    Create a Goal
                </Link>
            ) : (
                null
            )}
            <Outlet/>
            </div>
        </div>
    );
}