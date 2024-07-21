const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL



class ReviewService{
    //fetching Top 10 reviews
    async getAllReviews(){
        const res=await fetch(`${host}/api/review/getAllReviews`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
            }),
        })

        const json = await res.json();
        return json;
    }
}

module.exports=new ReviewService();