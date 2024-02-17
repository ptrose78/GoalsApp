import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "../features/goals/goalsSlice"

export default configureStore({
    reducer: {
        goals: goalsReducer
    }
})