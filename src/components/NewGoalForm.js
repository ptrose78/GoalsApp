import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import ROUTES from "../app/routes"
import { v4 as uuidv4 } from "uuid";
import {addGoal, postGoal} from "../features/goals/goalsSlice";

export default function NewGoalForm({title}) {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(e) {
      
        e.preventDefault();
        if ((name.length === 0) || (date.length === 0)) {
            return;
        }

    const id = uuidv4();
        dispatch(addGoal({id, name, date, note}));
        navigate(ROUTES.goalsRoute());

        const goalData = {
          id, id,
          name: name,
          date: date,
          note: note,
          };

    dispatch(postGoal(goalData));
    }

    return (
        <section className="goalGetter-form">
        <h2>{title || "Create a Goal"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="goal-name"
            className="goalGetter-input"
            placeholder="Goal Title"
            required
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <input
            id="goal-date"
            className="goalGetter-input"
            placeholder="Goal Date"
            required
            type="date"
            onChange={(e) => setDate(e.currentTarget.value)}
          />
          <input
            id="goal-note"
            className="goalGetter-input"
            placeholder="Goal Note"
            onChange={(e) => setNote(e.currentTarget.value)}
          />
          <button className="goalGetter-button" type="submit">Create Goal</button>
        </form>
      </section>
      
    )
}
