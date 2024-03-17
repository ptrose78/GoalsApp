import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ROUTES from "../app/routes";
import {addTask} from "../features/tasks/tasksSlice";
import {linkTaskToGoal} from "../features/goals/goalsSlice";
import {selectGoals} from "../features/goals/goalsSlice";
import { useParams } from "react-router-dom";
import {updateGoal} from "../features/goals/goalsSlice";
import {postTask, postTaskIdtoGoalId} from "../features/tasks/tasksSlice";
import {v4 as uuidv4} from "uuid";

export default function NewTaskForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goals = useSelector(selectGoals);
    const {goalId} = useParams();
    const goal = goals[goalId];

    const[name, setName] = useState();
    const[resources, setResources] = useState();
    const[notes, setNotes] = useState(); 

    function handleSubmit(e, name, resources, notes) {
        e.preventDefault();

        const id = uuidv4();

        dispatch(addTask({id, name, resources, notes}));

        const idData = {
          id: goalId,
          taskId: id
        };

        const taskData = {
          id: id,
          name: name,
          resources: resources,
          notes: notes
        }

        dispatch(updateGoal(idData));
        dispatch(postTask(taskData))
        dispatch(postTaskIdtoGoalId(idData));
        
        navigate(ROUTES.tasksRoute(goalId));
  
    }
    
    return (
        <section className="goalGetter-form">
        <h2>Create a New Task for "{goal.name}"</h2>
        <form onSubmit={(e)=>handleSubmit(e, name, resources, notes)} className="center-container">
          <input
            className="goalGetter-input"
            placeholder="Task Name"
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            className="goalGetter-input"
            placeholder="Task Resources"
            onChange={(e) => setResources(e.currentTarget.value)}
          />
          <input
            className="goalGetter-input"
            placeholder="Task Notes"
            onChange={(e) => setNotes(e.currentTarget.value)}
          />
          <button className="goalGetter-button" type="submit">Create New Task</button>
        </form>
      </section>
      

    )
}