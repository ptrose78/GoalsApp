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

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async(goalId) => {
        try {
            const response = await axios.get('/tasks/fetch', { params: {goalId} });
            
            const reformattedTasks = response.data.reduce((acc, task) => {
                const {id, name, resources, notes } = task;
                console.log(task)
                
                acc[id] = {
                  id: id,
                  name: name,
                  resources: resources,
                  notes: notes
                };
                return acc;
              }, {});
              return reformattedTasks;
        } catch(error) {
            throw error;
        }
    }
)

export const deleteTask = createAsyncThunk(
    'task/deleteTask', 
    async(id) => {
        try {
            const response = await axios.delete('/task/delete', { params: {id}});
            return response.data;
        }
        catch(error) {
            throw(error);
        }
    }
)

export const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: {}
    },
    reducers: {
        resetTasks: (state) => {
            state.tasks = {};
        },
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
        .addCase(fetchTasks.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
        .addCase(deleteTask.pending, (state) => {
            state.status = "loading";
        })
        .addCase(deleteTask.fulfilled, (state) => {
            state.status = "succeeded";
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
        }
    }
)

export const {resetTasks, addTask, removeTask} = tasksSlice.actions;
export const selectTasks = (state) => state.tasks.tasks;
export default tasksSlice.reducer;
