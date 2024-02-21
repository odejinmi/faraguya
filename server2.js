import express from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    port: "8889",
    database: 'fagaruya',
    user: "root",
    password: "root"
});

app.get('/getstack', (req, res) => {
    const sql = "SELECT * FROM stack";
    db.query(sql, (err, result)=> {
        if (err) return res.json({Message: "Error inside server"});
        // console.log(result);
        return res.json(result);
    })
});

app.get('/getstack/:id', (req, res) => {
    const sql = "SELECT * FROM stack WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id],(err, result)=> {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
});

app.put('/getstack/:id', (req, res) => {
    const sql = "UPDATE stack SET `stackname`=? WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [req.body.name, id],(err, result)=> {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
});

app.post('/createstack', (req, res)=> {
    const sql = "INSERT INTO stack (`stackname`) VALUES (?)";
    const values = [
        req.name
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    })
});


app.post('/login', (req, res)=> {
    const sql = "SELECT * FROM developer WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password,
    ];
    db.query(sql, [values], (err, result) => {
        if (err) return res.json("Login Failed");
        return res.json(result);
    })
});


app.listen(8081, ()=> {
    console.log("Listening");
});