import React, { useDispatch } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: {}
    },
    reducers: {
        addTask: (state, action) => {
            const {id, name, resources, notes} = action.payload;
            state.tasks[id] = {
				id: id,
				name: name,
				resources: resources,
                notes: notes
			};
        }, 
        removeTask: (state, action) => {
            const {id} = action.payload;
            state.tasks = Object.values(state.tasks).reduce((acc, task)=>{
				if (task.id !== id) {
					acc[task.id] = task
				}
				return acc;
				}, {});
        }
    } 
})

export const {addTask, removeTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export default tasksSlice.reducer;
