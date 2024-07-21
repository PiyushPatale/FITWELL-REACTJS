import { configureStore} from '@reduxjs/toolkit';
import userSlice from './slices/userSlice'
import productsSlice from './slices/productsSlice';
import workoutSlice from './slices/workoutSlice';

const store = configureStore({
    reducer: {
        user:userSlice,
        productsState:productsSlice,
        workouts:workoutSlice
    }
})

export default store;