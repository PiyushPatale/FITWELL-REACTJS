const connectToMongo = require('./db');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerDocs = require('./swagger');
connectToMongo()
const app = express()
var cors = require('cors')
const fs = require('fs');
const path = require('path');
const port = 5001;
// const {redis, setRedisCache, getRedisCache} = require('./utils/redis.js')
swaggerDocs(app, port)
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.urlencoded({extended: true, limit:"100mb"}));
app.use('./uploads/userProfiles/',express.static('/uploads'))
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
const userLogger = morgan('combined', { stream: accessLogStream });


app.get('/', (req, res) => {
  res.send({msg:"Hello"})
})

app.use('/api/getProfileImage', express.static(path.join(__dirname,"/uploads/userProfiles")))
app.use('/api/payments', require('./routes/razorpayPaymentRoutes'));
app.use('/api/adminAuth', require('./routes/admin'));
app.use('/api/userAuth',userLogger, require('./routes/user'));
app.use('/api/trainer', require('./routes/trainers'));
app.use('/api/order', require('./routes/order')); 
app.use('/api/review', require('./routes/reviews'));
app.use('/api/userActions', require('./routes/userActions'));
app.use('/api/product', require('./routes/products'));
app.use('/api/workout', require('./routes/homeWorkouts'));
app.use('/api/challenge', require('./routes/dailyChallenges'));
app.use('/api/adminTrainer', require('./routes/admin'));
app.use('/api/adminPayment', require('./routes/admin'));
app.use('/api/adminFeedback', require('./routes/admin'));
app.use('/api/adminCustomer', require('./routes/admin'));
app.use('/api/adminOrder', require('./routes/admin'));

app.use((error, req, res, next) => {
  const status = error?.statusCode || 500;
  const message = error.message || 'An error occurred';
  const data = error.data || null;
  res.status(status).json({ message, data });
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
