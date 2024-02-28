import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ROUTES from "../app/routes";
import {addTask} from "../features/tasks/tasksSlice";
import {linkTaskToGoal} from "../features/goals/goalsSlice";
import { useParams } from "react-router-dom";
import {v4 as uuidv4} from "uuid";

export default function NewTaskForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {goalId} = useParams();

    const[name, setName] = useState();
    const[resources, setResources] = useState();
    const[notes, setNotes] = useState(); 

    function handleSubmit(e) {
        e.preventDefault();

        const id = uuidv4();

        dispatch(addTask({id, name, resources, notes}));
        dispatch(linkTaskToGoal({goalId, id}));
        navigate(ROUTES.tasksRoute(goalId));
    }
    
    return (
        <section className="goalGetter-form">
        <h2>Create a New Task</h2>
        <form onSubmit={handleSubmit} className="center-container">
          <input
            className="goalGetter-input"
            placeholder="Name"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            className="goalGetter-input"
            placeholder="Resources"
            onChange={(e) => setResources(e.currentTarget.value)}
          />
          <input
            className="goalGetter-input"
            placeholder="Notes"
            onChange={(e) => setNotes(e.currentTarget.value)}
          />
          <button className="goalGetter-button" type="submit">Create New Task</button>
        </form>
      </section>
      

    )
}