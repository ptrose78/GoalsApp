import React from "react";


export default function NewGoalForm() {
    function handleSubmit() {
        
    }

    return (
        <section>
        <h2>Create a New Goal</h2>
        <form onSubmit = {handleSubmit}>

            <button type="submit">Create Goal</button>
        </form>
        </section>
    )
}
