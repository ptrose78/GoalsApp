import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import {useEffect} from "react";
import ROUTES from "../../app/routes";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {selectGoals} from "./goalsSlice"
import {selectTasks, fetchTasks} from "../tasks/tasksSlice"
import {selectTodos} from "../todos/todosSlice"
import {removeGoal, fetchGoals, deleteGoal} from "./goalsSlice";
import {removeGoalFromTodos} from "../todos/todosSlice"

export default function Goals() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goals = useSelector(selectGoals);
    const tasks = useSelector(selectTasks);
    const todos = useSelector(selectTodos);
    
    useEffect(() => {
      dispatch(fetchGoals());
    }, []); 

    function handleRemoveGoal(goalId) {
      
      dispatch(deleteGoal(goalId)).unwrap()
          .then(() => {
              dispatch(removeGoalFromTodos({goalId}));
              dispatch(removeGoal({goalId}));
          })
          .catch(error => {
              console.error("Failed to delete goal:", error);
          });
    }

    return (
      Object.keys(goals).length !== 0 ? (
      <section className="goal-list">
      <h1 className="page-heading">Goals List</h1> 
      <div className="table-container">
      <table className="goal-table">
        <thead>
          <tr>
            <th className="rounded-top-left">Name</th>
            <th>Date</th>
            <th className="rounded-top-right">Notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Object.values(goals).map((goal) => (
            <tr key={goal.goalId}>
              <td>{goal.name}</td>
              <td>{goal.date}</td>
              <td>{goal.note}</td>
              <td>
              {goal.taskId.length !== 0 ? (
                <Link to={ROUTES.tasksRoute(goal.goalId)}><button className="task-button">See Tasks</button></Link>
              ) : (
              <Link to={ROUTES.newTaskRoute(goal.goalId)}><button className="task-button">Create Task</button></Link>
              )}
              <button onClick={() => handleRemoveGoal(goal.goalId)} className="remove-button">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          
      {Object.values(goals).length !== 0 && (
        <Link to={ROUTES.newGoalRoute()} className="custom-link">
          <button className="custom-button">Create New Goal</button>
        </Link>
      )}
    </div> 
    </section>
    ) : (
      navigate("/goals/new")
    )
  )
}
    