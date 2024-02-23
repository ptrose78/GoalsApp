import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import ROUTES from "./routes";
import {useDispatch, useSelector} from "react-redux";
import {selectGoals} from "../features/goals/goalsSlice";
import {selectTodos} from "../features/todos/todosSlice";


export default function AppLayout() {
    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);

    return (
        <div>    
            <nav>
                <ul>
                {Object.keys(goals).length === 0 ? (
                    <li> 
                        <NavLink to={ROUTES.newGoalRoute()}>
                            Create a Goal
                        </NavLink>
                    </li>
                ) : (
                    <li> 
                        <NavLink to={ROUTES.goalsRoute()}>
                            Goals
                        </NavLink>
                    </li>
                )}

                {Object.values(todos).length !== 0 ? (
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
            <Outlet/>
        </div>
    );
}