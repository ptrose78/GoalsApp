import React from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: {}
    },
    reducers: {
        addTask: (state, action) => {
            
            const {id, name, resources, notes} = action.payload;
            console.log(id)
            console.log(action.payload)
            state.tasks[id] = {
				id: id,
				name: name,
				resources: resources,
                notes: notes
			};
        },
        removeTask: (state, action) => {
            const {id} = action.payload;
            state.tasks.filter(task=>task.id !== id)
        }
    } 
})

export const {addTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export default tasksSlice.reducer;
