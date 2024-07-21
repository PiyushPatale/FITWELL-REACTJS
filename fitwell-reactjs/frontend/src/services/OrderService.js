const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL
class OrderService{
    //Getting Orders of User
    async getUserOrders(reqData){
        const res=await fetch(`${host}/api/order/getUserOrders`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })

        const json = await res.json();
        return json;
    }

    async createOrder(reqData){
        const res=await fetch(`${host}/api/order/createOrder`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })

        const json = await res.json();
        return json;
    }

    async deleteOrder(reqData){
        const res=await fetch(`${host}/api/order/deleteOrder`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqData),
        })

        const json = await res.json();
        return json;
    }
}
module.exports=new OrderService();