import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	goals: {}
}

export const goalsSlice = createSlice({
	name: "goals",
	initialState: initialState,
	reducers: {
		addGoal: (state, action) => {
			const {id, name, date} = action.payload;
			console.log(action.payload)
			state.goals[id] = {
				id: id,
				name: name,
				date: date,
				taskIds: []
			};
		},
		removeGoal: (state, action) => {
			const {id, name, date} = action.payload;
			state.goals.filter(goal => goal.id !== id)
		},
        linkTaskToGoal: (state, action) => {
            const {goalId, id} = action.payload;
			state.goals[goalId].taskIds.push(id);
        }
    }
})

export const {addGoal, removeGoal, linkTaskToGoal} = goalsSlice.actions;
export const selectGoals = (state) => state.goals.goals;
export default goalsSlice.reducer;
