import React from "react";
import { UseDispatch, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ROUTES from "../app/routes";
import {addTask} from "../features/tasks/tasksSlice";
import { useParams } from "react-router-dom";

export default function NewTaskForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {goalId} = useParams();

    function handleSubmit() {

        dispatch(addTask);
        navigate(ROUTES.goalRoute(goalId));
    }
    
    return (
        <section>
            <h2>Create a New Task</h2>           
            <form onSubmit={handleSubmit}>
                <input placeholder="Name">
                </input>
                <input placeholder="Resources">
                </input>
                <input placeholder="notes"></input>
                <button submit>Create New Task</button>
            </form>
        </section>

    )
}