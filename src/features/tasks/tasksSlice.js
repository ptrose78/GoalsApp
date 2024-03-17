import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postTask = createAsyncThunk(
    'tasks/postTask', 
    async(taskData) => {
        try {
            const response = await axios.post('/tasks/new', taskData);
            console.log(response.data)
            return response.data;
        } catch(error) {
            throw error;
        }
    }
)

export const postTaskIdtoGoalId = createAsyncThunk(
    'tasks/postTaskIdToGoalId',
    async(idData) => {
        try {
            const response = await axios.post('/tasks/Ids', idData);
            console.log('ids');
            return response.data;
        } catch (error) {
            throw (error);
        }
    }
)

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
    },
    extraReducers: (builder) => {
        builder
        .addCase(postTask.pending, (state) => {
            state.status = "loading";
        })
        .addCase(postTask.fulfilled, (state) => {
            console.log("fulfilled tasks");
            state.status = "succeeded";
        })
        .addCase(postTask.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
        .addCase(postTaskIdtoGoalId.pending, (state) => {
            state.status = "loading";
        })
        .addCase(postTaskIdtoGoalId.fulfilled, (state) => {
            state.status = "succeeded";
        })
        .addCase(postTaskIdtoGoalId.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
        }
    }
)

export const {addTask, removeTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export default tasksSlice.reducer;
