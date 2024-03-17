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

export const updateGoal = createAsyncThunk(
	'goals/updateGoal',
	async(updateData) => {
		try {
			const response = await axios.put('/goals/update', updateData);
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
		const { id, name, date, note, taskIds } = goal;
		
		acc[id] = {
		  id: id,
		  name: name,
		  date: date,
		  note: note,
		  taskIds: []
		};
		return acc;
	  }, {});
	  return reformattedGoals;
	} catch (error) {
	  throw error;
	}
  });

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id) => {
	try {
	  const response = await axios.delete('/goals/delete', { params: {id} }); 
	  return response.data;
	} catch (error) {
	  throw error;
	}
  });

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
			const {id, name, date, note} = action.payload;
			
			state.goals[id] = {
				id: id,
				name: name,
				date: date,
				note: note,
				taskIds: []
			};
		},
		removeGoal: (state, action) => {
			const {id, name, date, note} = action.payload;
			
			state.goals = Object.values(state.goals).reduce((acc, goal)=>{
				if (goal.id !== id) {
					acc[goal.id] = goal
				}
				return acc;
				}, {});
		},
        linkTaskToGoal: (state, action) => {
            const {goalId, id} = action.payload;

			state.goals[goalId].taskIds.push(id);
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
			  .addCase(updateGoal.pending, (state, action) => {
				state.status = 'loading';
			  })
			  .addCase(updateGoal.fulfilled, (state, action) => {
				state.status = 'succeeded';
			  })
			  .addCase(updateGoal.rejected, (state, action) => {
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
		  }
	}
)
		

export const {addGoal, removeGoal, linkTaskToGoal, removeTaskFromGoals, linkTodoToGoal} = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;
