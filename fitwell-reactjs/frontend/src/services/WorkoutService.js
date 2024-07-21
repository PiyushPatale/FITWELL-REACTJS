const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL
class WorkoutService{
    //Getting all workout
    async getAllWorkout(){
        const response= await fetch(`${host}/api/workout/getAllWorkouts`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
            }),
        })
        const json = await response.json();
        return json;
    }
    async addWorkout(reqData){
        const response= await fetch(`${host}/api/workout/uploadWorkouts`, {
            method:'POST',
            body:reqData
        })
        const json = await response.json();
        return json;
    }

    async deleteWorkout(reqData){
        console.log(reqData);
        const response= await fetch(`${host}/api/workout/deleteWorkout`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }
}

module.exports=new WorkoutService();