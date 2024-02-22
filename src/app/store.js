import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "../features/goals/goalsSlice"
import tasksReducer from "../features/tasks/tasksSlice"
import todosReducer from "../features/todos/todosSlice"

export default configureStore({
    reducer: {
        goals: goalsReducer,
        tasks: tasksReducer,
        todos: todosReducer
    }
})