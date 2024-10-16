import React from "react";
import {Outlet, NavLink, Link} from "react-router-dom";
import ROUTES from "./routes";
import {BrowserRouter as Route} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {selectGoals,fetchGoals} from "../features/goals/goalsSlice";
import {selectTodos} from "../features/todos/todosSlice";
import {selectTasks} from "../features/tasks/tasksSlice";
import { useLocation } from 'react-router-dom';
import NewGoalForm from "../components/NewGoalForm"
import Goals from "../features/goals/Goals"


export default function AppLayout() {
    const dispatch = useDispatch();

    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);
    const tasks = useSelector(selectTasks);
    const location = useLocation();
    const title = "Create Your First Goal";

    return (     
        <div>                    
            <div className="center-nav">
                <nav>
                    <h1 className="app-name-1">Goal Getter</h1>
                    <ul>
                        <li>
                            <NavLink to={ROUTES.goalsRoute()}>
                                Goals
                            </NavLink>
                        </li>
                        <li>            
                            <NavLink to={ROUTES.todoRoute()}>
                                To-dos
                            </NavLink>    
                        </li>  
                    </ul>  
                </nav>                         
            </div>
            <div>
            {Object.keys(goals).length === 0 && location.pathname === ROUTES.homeRoute() ? (
                      
                <NewGoalForm title={title}/>
            
            ) : (
                null
                //<Route to={ROUTES.goalsRoute()}/>
            )}
            <Outlet/>
            </div>
            
        </div>
    )
}
