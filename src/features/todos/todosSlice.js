import {createSlice} from "@reduxjs/toolkit";

const initialState = {
            todos: []
        }

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            const id = action.payload;
            state.todos.push(id); 
          },
        removeTodo: (state, action) => {
            const {id} = action.payload;
            state.todos = state.todos.filter(todo => todo.id !== id)
        }
    }
}) 

export const {addTodo, removeTodo, linkTaskToTodo, removeTaskFromTodo} = todosSlice.actions;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;