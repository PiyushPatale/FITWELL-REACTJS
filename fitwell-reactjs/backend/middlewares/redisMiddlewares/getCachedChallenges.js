const { json } = require('body-parser');
const redis = require('../../utils/redis.js');

const getRedisCachedChallenges = async (req, res, next) => {
    try {
        // Retrieve products data from Redis using client.get
        redis.get('challenges', (err, challenges) => {
            if (err) {
                console.error("Error fetching cached products from Redis:", err);
                return next(err); // Pass the error to the error-handling middleware
            }

            if (challenges != null) {
                // Parse the JSON data
                const parsedData = JSON.parse(challenges);

                // Attach the cached products data to the request object
                req.cachedChallenges = parsedData;

                // Proceed to the next middleware or route handler
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

module.exports = { getRedisCachedChallenges };