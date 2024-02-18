import React from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: " "
    },
    reducers: {
        addTask: (state, action) => {
            const {id} = action.payload;
            state.tasks[id] = action.payload;
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
