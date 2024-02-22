import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: {}
}

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            console.log(id);
            const {id} = action.payload;
            state.todos[id] = {
                id: id,
                taskIds: []
            }
        },
        removeTodo: (state, action) => {
            const {id, taskIds} = action.payload;
            state.todos = Object.values(state.todos).reduce((acc, todo)=>{
                if (todo.id !== id) {
                    acc[todo.id] = todo;
                }
                return acc;
            }, {});
        },
        linkTaskToTodo: (state, action) => {
            const {todoId, id} = action.payload;
            state.todos[todoId].taskIds.push(id);
        }
    }
}) 

export const {addTodo, removeTodo, linkTaskToTodo} = todosSlice.actions;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;