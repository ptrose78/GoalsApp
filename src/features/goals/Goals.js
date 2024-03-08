import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import ROUTES from "../../app/routes";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {selectGoals} from "./goalsSlice"
import {selectTodos} from "../todos/todosSlice"
import {removeGoal, fetchGoals, deleteGoal} from "./goalsSlice";
import {removeGoalFromTodos, removeAllTodos} from "../todos/todosSlice"
import { Outlet, NavLink } from "react-router-dom";
import NewGoalForm from "../../components/NewGoalForm";

export default function Goals() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
      dispatch(fetchGoals());
    }, [dispatch]); 


    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);

    function handleRemoveGoal(id) {
      
      dispatch(deleteGoal(id)).unwrap()
          .then(() => {
              dispatch(removeGoalFromTodos({ id }));
              dispatch(removeGoal({ id }));
              //dispatch(fetchGoals())
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
            <tr key={goal.id}>
              <td>{goal.name}</td>
              <td>{goal.date}</td>
              <td>{goal.note}</td>
              <td>
                <Link to={ROUTES.tasksRoute(goal.id)}><button className="task-button">Add Task</button></Link>
                <button onClick={() => handleRemoveGoal(goal.id)} className="remove-button">X</button>
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
    <>
      <div style={{ textAlign: 'center' }}>
      <h2>Oops, You have not created a goal yet!</h2>
      </div>
      <div style={{ textAlign: 'center' }}>
      <NewGoalForm title={"Create a Goal"}/>
      </div>
    </>
    )
    )
}
    