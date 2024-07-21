const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL

class ChallengeService{
    //Getting all challenges
    async getAllChallenge(){
        const response= await fetch(`${host}/api/challenge/getAllChallenges`, {
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

    async uploadChallenge(reqData){
        console.log(reqData);
        const response= await fetch(`${host}/api/challenge/uploadChallenge`, {
            method:'POST',
            body:reqData
        })
        const json = await response.json();
        return json;
    }
    async deleteChallenge(reqData){
        console.log(reqData);
        const response= await fetch(`${host}/api/challenge/deleteChallenge`, {
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

module.exports=new ChallengeService();