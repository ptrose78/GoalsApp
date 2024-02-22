import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: {}
}

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodos: (state, action) => {
            const {id, todos} = action.payload;
            state.todos[id] = {
                id: id,
                taskIds: []
            }
        },
        removeTodos: (state, action) => {
            const {id, taskIds} = action.payload;
            state.todos = Object.values(state.todos).reduce((acc, todo){
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