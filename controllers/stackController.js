import db from "../config/dbConnection.js";
import {validationResult} from 'express-validator';

class stackController {
    static fetchstacks = (req, res) => {
        const sql = "SELECT * FROM stack";
        db.query(sql, (err, result)=> {
            if (err) return res.json({msg: "Error inside server"});
            // console.log(result);
            // return res.json(result);
            return res.status(200).send({
                msg:result
            });
        })
    };

    static fetchstack = (req, res) => {
        const sql = "SELECT * FROM stack WHERE ID = ?";
        const id = req.params.id;

        db.query(sql, [id],(err, result)=> {
            if (err) return res.json({Message: "Error inside server"});
            return res.status(200).send({
                msg:result
            });
        })
    };

    static updatestack = (req, res) => {
        const sql = "UPDATE stack SET `stackname`=? WHERE ID = ?";
        const id = req.params.id;

        db.query(sql, [req.body.name, id],(err, result)=> {
            if (err) return res.json({Message: "Error inside server"});
            return res.status(200).send({
                msg:"Stack Updated succesfully"
            });
        })
    };

    static createstack = (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()[0]["msg"]});
        }
        const sql = `INSERT INTO stack (stackname) VALUES ('${req.body.name}')`;
        const values = [
            req.name
        ];
        db.query(sql,  (err, result) => {
            if (err) return res.json(err);
            return res.status(200).send({
                msg:"Stack created succesfully"
            });
        })
    };

}

export default stackController;