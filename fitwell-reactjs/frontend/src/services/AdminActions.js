const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL

class AdminAction{
    async getAllAdminTrainerList(){
        const response= await fetch(`${host}/api/adminTrainer/getAllAdminTrainer`, {
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

    async getAllAdminPayment(){
        const response= await fetch(`${host}/api/adminPayment/getAllAdminPayment`, {
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
    
    async getAllAdminFeedback(){
        const response= await fetch(`${host}/api/adminFeedback/getAllAdminFeedback`, {
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
    
    
    async getAllAdminCustomer(){
        const response= await fetch(`${host}/api/adminCustomer/getAllAdminCustomer`, {
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
    
    
    async getAllAdminOrder(){
        const response= await fetch(`${host}/api/adminOrder/getAllAdminOrder`, {
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
    async deleteTrainer(reqData){
        const trainerid = reqData.trainerid;
        const response= await fetch(`${host}/api/adminTrainer/deleteTrainer/${trainerid}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            // body:JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    async deleteCustomer(reqData){
        const response= await fetch(`${host}/api/adminCustomer/deleteCustomer`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    async deleteOrder(reqData){
        const response= await fetch(`${host}/api/adminOrder/deleteOrder`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    async deleteFeedback(reqData){
        const response= await fetch(`${host}/api/adminFeedback/deleteFeedback`, {
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

module.exports = new AdminAction();