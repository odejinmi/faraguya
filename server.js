require("dotenv").config();
const express =require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const uri = "mongodb+srv://adeyemi:odejinmi@cluster0.hoeujpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri);

// require('./config/dbConnection');
// require('./config/mongodbConnection');
const developerRouter = require('./routes/developerRoute');
const adminRouter = require('./routes/adminRoute');
const clientRouter = require('./routes/clientRoute');
const generalRoute = require('./routes/generalRoute');
const websocket = require('./config/websocket');
const socketios = require('./config/socketio');
const developerController =require( "./controllers/developerController");

const port = process.env.PORT;

// dotenv.config();
const app = express();
socketios(app);

app.use(express.json());
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors());

app.use('/api/admin', adminRouter);
app.use('/api/client', clientRouter);
app.use('/api/developer', developerRouter);
app.use('/api', generalRoute);

developerController.createadmin().then(r => console.log('Server is running on admin created '+port));
//error handling
app.use((err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });

});

// https.listen(port, ()=> console.log('Server is running on port '+port));
const server = app.listen(port, ()=> console.log('Server is running on port '+port));

websocket (server);
