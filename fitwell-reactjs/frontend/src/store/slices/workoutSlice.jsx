import {createSlice} from "@reduxjs/toolkit";

const homeWorkout=[];
const challenges=[];

const workoutReducer = createSlice({
    name:'workoutReducer',
    initialState:{
        homeWorkout,
        challenges
    },
    reducers:{
        setWorkout:(state, action)=>{
            const data=action.payload;
            state.homeWorkout=data
        },
        setChallenges:(state, action)=>{
            const data = action.payload;
            state.challenges=data
        },
        deleteWorkout: (state, action) => {
            const { workoutId } = action.payload;
            state.homeWorkout = state.homeWorkout.filter(workout => workout._id !== workoutId);
        },
        deleteChallenge: (state, action) => {
            const { challengeid } = action.payload;
            state.challenges = state.challenges.filter(challenge => challenge._id !== challengeid);
        }
    }
})

export const {setWorkout, setChallenges, deleteWorkout, deleteChallenge} = workoutReducer.actions;
export default workoutReducer.reducer;