import {createSlice} from "@reduxjs/toolkit";

const initialState = {
            todos: {}
        }

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            const {id, goalId} = action.payload;
            state.todos[id] = {
				id: id,
                goalId: goalId
			};	
        },
        removeTodo: (state, action) => {
            const {id} = action.payload;
            state.todos = Object.values(state.todos).reduce((acc, todo)=>{
				if (todo.id !== id) {
					acc[todo.id] = todo;
				}
				return acc;
				}, {});
        },
        removeGoalFromTodos: (state, action) => {
            const {id} = action.payload;
            state.todos = Object.values(state.todos).reduce((acc, todo) =>{
                if (todo.goalId !== id) {
                    acc[todo.id] = todo;
                }
                return acc;
            }, {})
        },
        removeAllTodos: (state, action) => {
            state.todos = [];
        }
    }
})

export const {addTodo, removeTodo, removeGoalFromTodos, removeAllTodos} = todosSlice.actions;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;