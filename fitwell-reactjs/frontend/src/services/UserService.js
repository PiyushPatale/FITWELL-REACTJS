const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL

class UserService{

    //Login into account
    async userLogin(reqData){
        const response= await fetch(`${host}/api/userAuth/userLogin`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }


    //Creating User Account
    async createUser(reqData){
        const response= await fetch(`${host}/api/userAuth/createUser`, {
            method:'POST',
            body:reqData,
        })
        const json = await response.json();
        return json;
    }


    //Get All list of Users
    async getAllUsers(){
        const response= await fetch(`${host}/api/userAuth/getAllUsers`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({}),
        })
        const json = await response.json();
        return json;
    }

}

module.exports= new UserService();