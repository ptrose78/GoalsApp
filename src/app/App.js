import React from "react";
import './App.css';
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";
import Goals from "../features/goals/Goals";
import AppLayout from "./AppLayout";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout/>}>
          <Route path="goals" element={<Goals/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
