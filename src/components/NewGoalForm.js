import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ROUTES from "../app/routes"
import { v4 as uuidv4 } from "uuid";
import {addGoal} from "../features/goals/goalsSlice";


export default function NewGoalForm() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
      
        e.preventDefault();
        if ((name.length === 0) || (date.length === 0)) {
            return;
        }

    const id = uuidv4();
        dispatch(addGoal({id, name, date}));
     console.log('hi')
        navigate(ROUTES.goalsRoute());
    }

    return (
        <section>
        <h2>Create a New Goal</h2>
        <form onSubmit = {handleSubmit}>
            <input id="goal-name" 
                   placeholder="Goal Title" 
                   onChange={(e) => setName(e.currentTarget.value)}>
            </input>
            <input 
                    id="goal-date"
                    placeholder="Goal Date" 
                    onChange={(e) => setDate(e.currentTarget.value)}>
            </input>
            <button type="submit">Create Goal</button>
        </form>
        </section>
    )
}
