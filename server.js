require("dotenv").config();
const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABSE_URL);
// require('./config/dbConnection');
const developerRouter = require('./routes/developerRoute');
const adminRouter = require('./routes/adminRoute');
const clientRouter = require('./routes/clientRoute');
const generalRoute = require('./routes/generalRoute');

const port = process.env.PORT;


// dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors());

app.use('/api/admin', adminRouter);
app.use('/api/client', clientRouter);
app.use('/api/developer', developerRouter);
app.use('/api', generalRoute);


//error handling
app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });

});

app.listen(port, ()=> console.log('Server is running on port '+port));
