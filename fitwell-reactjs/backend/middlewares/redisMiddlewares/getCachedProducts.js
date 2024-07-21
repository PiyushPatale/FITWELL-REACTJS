const { json } = require('body-parser');
const redis = require('../../utils/redis.js');

const getRedisCachedProducts = async (req, res, next) => {
    try {
        // This is used to retrieve products data from Redis using client.get
        redis.get('products', (err, products) => {
            if (err) {
                console.error("Error fetching cached products from Redis:", err);
                return next(err); // Pass the error to the error-handling middleware
            }
            
            if (products != null) {
                const parsedData = JSON.parse(products);

                req.cachedProducts = parsedData;

                return next();
            } else {

                return next();
            }
        });
    } catch (error) {
        // Handle any unexpected errors
        console.error("Error in getRedisCachedProducts middleware:", error);
        return next(error); // Pass the error to the error-handling middleware
    }
};

module.exports = { getRedisCachedProducts };