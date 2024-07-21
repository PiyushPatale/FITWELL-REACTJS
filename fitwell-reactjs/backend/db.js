const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI=process.env.mongoURI
const ProductSchema = require('./models/product.js')

const connectToMongo = async () => {
    const client = await mongoose.connect(mongoURI)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err))
}

module.exports = connectToMongo
