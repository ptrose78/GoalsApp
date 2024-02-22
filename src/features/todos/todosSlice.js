import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    todos: {}
}

export const todosSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        addTodo: (state, action) => {
            const {id} = action.payload;
            console.log(id);
            state.todos[id] = {
                id: id,
                taskIds: []
            }
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
        linkTaskToTodo: (state, action) => {
            const {taskId, id} = action.payload;
            state.todos[id].taskIds.push(taskId);
        },
        removeTaskFromTodo: (state, action) => {
            const {id} = action.payload;
            Object.values(state.todos).forEach((todo)=>{
				todo.taskIds = todo.taskIds.filter((taskId) => taskId !== id)
			})
        }
    }
}) 

export const {addTodo, removeTodo, linkTaskToTodo, removeTaskFromTodo} = todosSlice.actions;
export const selectTodos = (state) => state.todos.todos;
export default todosSlice.reducer;