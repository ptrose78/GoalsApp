import React from "react";
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import AppLayout from "./AppLayout"
import Goals from "../features/goals/Goals"
import NewGoalForm from "../components/NewGoalForm"
import Goal from "../features/tasks/Tasks"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route path="goals" element={<Goals/>}/>
          <Route path="goals/new" element={<NewGoalForm/>}/>
          <Route path="goals/:goalId" element={<Goal/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
