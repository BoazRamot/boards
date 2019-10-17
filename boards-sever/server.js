const express = require('express');
const cookieSession = require('cookie-session');
const authRoute = require('./routes/auth-routes');
const passport = require('passport');
const passportSetup = require('./services/passport-setup');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const connectDB = require('./db/db');

const app = express();

// set up session cookies
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [keys.session.cookieKey]
// }));

// initialize passport
app.use(passport.initialize());
// app.use(passport.session());

// Connect to Database
connectDB();

// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//   console.log('connected to mongodb');
// });

// Define port
const PORT = process.env.PORT || 5000;



// Init middleware
// app.use(cors({
//   credentials: true,
// }));
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded




// Serve static files after build
app.use(express.static('/build'));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// Define routes
app.use('/api/auth', authRoute);

app.get('/', (req, res) => res.send('Api running...'));

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
