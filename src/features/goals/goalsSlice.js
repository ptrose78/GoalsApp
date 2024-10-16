import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postGoal = createAsyncThunk(
	'posts/postGoal',
	async(postData) => {
		try {
			const response = await axios.post('/goals/new', postData);
			return response.data;
	  	} catch(error) {
			throw error;
	  	}
	}
);

export const addTaskIdToGoal = createAsyncThunk(
	'goals/addTaskIdToGoal',
	async(updateData) => {
		try {
			const response = await axios.put('/goals/addTaskId', updateData);
			console.log(response)
			return response.data;
		}
		catch(error) {
			throw error;
		}
	}
)

export const removeTaskIdFromGoal = createAsyncThunk(
	'goals/removeTaskIdFromGoal',
	async(updateData) => {
		try {
			const response = await axios.put('/goals/removeTaskId', updateData);
			console.log(response)
			return response.data;
		}
		catch(error) {
			throw error;
		}
	}
)

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async() => {
	try {
	  	const response = await axios.get('/goals/fetch');
		console.log(response)
	  	const reformattedGoals = response.data.reduce((acc, goal) => {
		const { goalId, name, date, note, taskId } = goal;
		
		acc[goalId] = {
		  goalId: goalId,
		  name: name,
		  date: date,
		  note: note,
		  taskId: taskId
		};
		return acc;
	  }, {});
	  return reformattedGoals;
	} catch (error) {
	  throw error;
	}
  });

export const deleteGoal = createAsyncThunk('goals/delete', async (goalId) => {
	try {
	  const response = await axios.delete('/goals/delete', { params: {goalId} }); 
	  return response.data;
	} catch (error) {
	  throw error;
	}
  });

  export const deleteGoalIdAndTaskId = createAsyncThunk(
    'tasks/delete',
    async (goalId) => {
        try {
            const response = await axios.delete('tasks/delete', { params: {goalId} });
			console.log("deleteGoal and Task Ids")
            return response.data;
        } catch (error) {
            throw (error);
        }
    }
)

const initialState = {
	goals: {},
	status: 'idle',
    error: null,
}

export const goalsSlice = createSlice({
	name: "goals",
	initialState: initialState,
	reducers: {
		addGoal: (state, action) => {
			const {goalId, name, date, note} = action.payload;
			
			state.goals[goalId] = {
				goalId: goalId,
				name: name,
				date: date,
				note: note,
				taskIds: []
			};
		},
		removeGoal: (state, action) => {
			const {goalId, name, date, note} = action.payload;
			
			state.goals = Object.values(state.goals).reduce((acc, goal)=>{
				if (goal.goalId !== goalId) {
					acc[goal.goalId] = goal
				}
				return acc;
				}, {});
		},
        linkTaskToGoal: (state, action) => {
            const {goalId, id} = action.payload;
			console.log("linkTaskToGoal")
			state.goals[goalId].taskId.push(id);
        },
		linkTodoToGoal: (state, action) => {
            const {goalId, id} = action.payload;

			state.goals[goalId].todoIds.push(id);
        },
		removeTaskFromGoals: (state, action) => {
			const {id} = action.payload;
			Object.values(state.goals).forEach((goal)=>{
				goal.taskIds = goal.taskIds.filter((taskId) => taskId !== id)
			})
		}},
	extraReducers: (builder) => {
			builder
				.addCase(postGoal.pending, (state) => {
					state.status = 'loading';
				})
				.addCase(postGoal.fulfilled, (state, action) => {
					state.status = 'succeeded';
				})
				.addCase(postGoal.rejected, (state, action) => {
					state.status = 'failed';
					state.error = action.payload;
				})
				.addCase(addTaskIdToGoal.pending, (state, action) => {
					state.status = 'loading';
				})
				.addCase(addTaskIdToGoal.fulfilled, (state, action) => {
					state.status = 'succeeded';
				})
				.addCase(addTaskIdToGoal.rejected, (state, action) => {
					state.status = 'rejected';
					state.error = action.payload;
				})
				.addCase(removeTaskIdFromGoal.pending, (state, action) => {
					state.status = 'loading';
				})
				.addCase(removeTaskIdFromGoal.fulfilled, (state, action) => {
					state.status = 'succeeded';
				})
				.addCase(removeTaskIdFromGoal.rejected, (state, action) => {
					state.status = 'rejected';
					state.error = action.payload;
				})
				.addCase(fetchGoals.pending, (state) => {
					state.status = 'loading';
				})
				.addCase(fetchGoals.fulfilled, (state, action) => {
					state.status = 'succeeded';
					console.log(action.payload)
					state.goals = action.payload;
				})
				.addCase(fetchGoals.rejected, (state, action) => {
					state.status = 'failed';
					state.error = action.payload;
				})
				.addCase(deleteGoal.pending, (state) => {
					state.status = 'loading';
				})
				.addCase(deleteGoal.fulfilled, (state, action) => {
					state.status = 'succeeded';
				})
				.addCase(deleteGoal.rejected, (state, action) => {
					state.status = 'failed';
					state.error = action.payload;
				})
				.addCase(deleteGoalIdAndTaskId.pending, (state) => {
					state.status = "loading";
				})
				.addCase(deleteGoalIdAndTaskId.fulfilled, (state, action) => {
					state.status = "succeeded";
					state.error = action.payload;
				})
				.addCase(deleteGoalIdAndTaskId.rejected, (state, action) => {
					state.status = "rejected";
					state.error = action.payload;
				})
		  }
	}
)
		

export const {addGoal, removeGoal, linkTaskToGoal, removeTaskFromGoals, linkTodoToGoal} = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;
