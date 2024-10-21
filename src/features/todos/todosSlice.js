import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const postTodo = createAsyncThunk(
    'todos/postTodo',
    async(todoData) => {
        try {
            const response = await axios.post('/todos/new', todoData);
            console.log(response.data)
            return response.data;
        }
        catch(error) {
            throw error;
        }
    }
)

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async() => {
        try {
            const response = await axios.get('/todos/fetch');
            const reformattedTodos = response.data.reduce((acc, todo) => {
                const {id, name, resources, notes, goal} = todo;

                acc[id] = {
                    id: id,
                    name: name,
                    resources: resources,
                    notes: notes,
                    goal: goal
                };
                return acc;
            },{})
            return reformattedTodos;
        }
        catch(error) {
            throw error;
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'delete/deleteTodo',
    async(id) => {
        try {
            const response = await axios.delete('todo/delete', {params: {id}});
            return response.data;
        } 
        catch(error) {
            throw(error);
        }
    }
)

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
    },
    extraReducers: (builder) => {
        builder
        .addCase(postTodo.pending, (state) => {
            state.status = "pending";
        })
        .addCase(postTodo.fulfilled, (state) => {
            state.status = "fulfilled";
        })
        .addCase(postTodo.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
        .addCase(fetchTodos.pending, (state) => {
            state.statue = "pending";
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.todos = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
        .addCase(deleteTodo.pending, (state) => {
            state.status = "pending";
        })
        .addCase(deleteTodo.fulfilled, (state) => {
            state.status = "fulfilled";
        })
        .addCase(deleteTodo.rejected, (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        })
    }
})

export const {addTodo, removeTodo, removeGoalFromTodos, removeAllTodos} = todosSlice.actions;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;