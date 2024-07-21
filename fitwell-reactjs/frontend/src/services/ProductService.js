const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL

class ProductService{
    //Getting Products for product-landing page
    async getProducts(){
        const res=await fetch(`${host}/api/product/getProducts`,{
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
    async getProductsList(){
        const res=await fetch(`${host}/api/product/getProductsList`,{
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

    async deleteProduct(reqdata){
        const res=await fetch(`${host}/api/product/deleteProduct`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqdata),
        })

        const json = await res.json();
        return json;
    }

    async getProductsSearchResult(reqdata){
        const res=await fetch(`${host}/api/product/getProductsSearchResult`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqdata),
        })

        const json = await res.json();
        return json;
    }

    async addProduct(reqData){
        const res=await fetch(`${host}/api/product/addProduct`,{
            method:'POST',
            body:reqData
        })

        const json = await res.json();
        return json;
    }
}

module.exports=new ProductService();