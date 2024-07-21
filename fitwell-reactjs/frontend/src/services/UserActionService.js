const { PUBLIC_SERVER_URL } = require("../api");

const host=PUBLIC_SERVER_URL

class UserActionService {

    constructor() {
        this.fetchJSON = this.fetchJSON.bind(this);
    }

    async fetchJSON(url, options) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }

    //Submiiting Contact Form
    async contactUs(reqData) {
        const response = await fetch(`${host}/api/userActions/contactus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
            console.log("🚀 ~ UserActionService ~ contactUs ~ reqData:", reqData)
        const json = await response.json();
        return json;
    }

    //Updating User Profile
    async updateProfile(reqData) {
        const response = await fetch(`${host}/api/userActions/updateProfile`, {
            method: 'POST',
            body: reqData,
        })
        const json = await response.json();
        return json;
    }

    //Putting a review
    async putReview(reqData) {
        const response = await fetch(`${host}/api/userActions/putReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    //Getting Particular User Payment
    async getUserPayments(reqData) {
        const response = await fetch(`${host}/api/userActions/get-user-payments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    //async addToCart
    async addToCart(reqData) {
        const response = await fetch(`${host}/api/userActions/addtocart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    async getUserCartProducts(reqData) {
        const response = await fetch(`${host}/api/userActions/get-user-cart-products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }

    async checkOutCart(reqData) {
        const response = await fetch(`${host}/api/userActions/checkoutcart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        })
        const json = await response.json();
        return json;
    }
    async deleteCartItem(payload) {
        try {
            const response = await this.fetchJSON(`${host}/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            return response;
        } catch (error) {
            console.error('Error deleting cart item:', error);
            throw error;
        }
    }
}

module.exports = new UserActionService();