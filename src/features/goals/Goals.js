import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import ROUTES from "../../app/routes";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import {selectGoals} from "./goalsSlice"
import {selectTodos} from "../todos/todosSlice"
import {removeGoal} from "./goalsSlice";
import {removeAllTodos} from "../todos/todosSlice"
import { Outlet, NavLink } from "react-router-dom";

export default function Goals() {

    const goals = useSelector(selectGoals);
    const todos = useSelector(selectTodos);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleRemoveGoal(id) {
        dispatch(removeGoal({id}));

        if (Object.keys(goals).length === 1) {
            dispatch(removeAllTodos())
            navigate(ROUTES.homeRoute());
        }
    }

    return (
      Object.keys(goals).length !== 0 ? (    
        <section className="goal-list">
      <table className="goal-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Note</th>
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
              <Link to={ROUTES.tasksRoute(goal.id)}><button className="task-button">Tasks List</button></Link>
              <button onClick={() => handleRemoveGoal(goal.id)} className="remove-button">X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {Object.values(goals).length !== 0 && (
        <Link to={ROUTES.newGoalRoute()} className="create-goal-link">
          Create New Goal
        </Link>
      )}
    </section>
    ) : (
    null
    )

    )
}
    