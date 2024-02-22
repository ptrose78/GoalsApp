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
import Tasks from "../features/tasks/Tasks"
import NewTaskForm from "../components/NewTaskForm"
import Todos from "../features/todos/Todos"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route path="goals" element={<Goals/>}/>
          <Route path="goals/new" element={<NewGoalForm/>}/>
          <Route path="goals/:goalId" element={<Tasks/>}/>
          <Route path="tasks/new/:goalId" element={<NewTaskForm/>}/>
          <Route path ="todos" element={<Todos/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
