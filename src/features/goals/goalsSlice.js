import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	goals: {}
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
			console.log(goalId)

			state.goals[goalId].todoIds.push(id);
        },
		removeTaskFromGoals: (state, action) => {
			const {id} = action.payload;
			Object.values(state.goals).forEach((goal)=>{
				goal.taskIds = goal.taskIds.filter((taskId) => taskId !== id)
			})
		}
    }
})

export const {addGoal, removeGoal, linkTaskToGoal, removeTaskFromGoals, linkTodoToGoal} = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;
