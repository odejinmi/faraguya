import {validationResult} from 'express-validator';
import bcrypt from 'bcryptjs';
import db from '../config/dbConnection.js';
import randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import sendMail from '../helpers/sendMail.js';

// const { validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');

// const db = require('../config/dbConnection');

// const randomstring = require('randomstring');
// const sendMail = require('../helpers/sendMail');

// const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;

const JWT_SECRET = 'my-super-strong-secret';

class userController {
    static register = (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        db.query(
            // `SELECT * FROM developer WHERE LOWER(${db.escape(
            //     req.body.email
            // )});`,
            `SELECT * FROM developer where email =? `,req.body.email,
            (err, result)=>{
                if(result && result.length){
                    return res.status(409).send({
                        msg: 'This user is already in use! '
                    });
                }else{
                    bcrypt.hash(req.body.password, 10, (err,hash)=>{
                        if (err){
                            return res.status(400).send({
                                msg:err
                            });
                        }else{
                            db.query(
                                `INSERT INTO developer (firstname,lastname,email,phonenumber,password) VALUES ('${req.body.firstname}','${req.body.lastname}',${db.escape(
                                    req.body.email
                                )},'${req.body.phonenumber}',${db.escape(hash)});`,
                                (err, result) => {
                                    if (err){
                                        return res.status(400).send({
                                            msg:err
                                        })
                                    }

                                    let mailSubject = 'mail Verification';
                                    const randomToken = randomstring.generate();
                                    // let content = '<p> Hii '+ req.body.name+', \
                                    // Please <a href="http://127.0.0.1:3000/mail-varification?token='+randomToken+'"> Verify</a> your Mail.';
                                    // sendMail(req.body.email, mailSubject, content);

                                    db.query('UPDATE developer set token=? where emal=?',[randomToken,req.body.email],function(error, result,fields) {
                                        if(error){
                                            return res.status(400).send({
                                                msg:err
                                            });
                                        }
                                    });
                                    return res.status(200).send({
                                        msg:'The user has been registered with us!'
                                    });
                                }
                            )
                        }
                    });
                }
            }
        );
    };

    static login = (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        db.query(
            `SELECT * FROM developer WHERE email = ${db.escape(req.body.email)};`,
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        msg: err
                    });
                }

                if (!result.length) {
                    return res.status(401).send({
                        msg: 'Email or Password is incorrect!'
                    });
                }

                bcrypt.compare(
                    req.body.password,
                    result[0]['password'],
                    (bErr, bResult) => {
                        if (bErr) {
                            return res.status(400).send({
                                msg: bErr
                            });
                        }
                        if (bResult) {
                            // console.log(JWT_SECRET);
                            const token = jwt.sign({
                                id: result[0]['id'],
                                is_admin: result[0]['is_admin']
                            }, JWT_SECRET, {expiresIn: '1h'});
                            db.query(`UPDATE developer SET last_login = now() WHERE id = '${result[0]['id']}'`);

                            return res.status(200).send({
                                msg: 'Logged In',
                                token: token,
                                user: result[0]
                            })
                        }

                        return res.status(401).send({
                            msg: 'Email or Password is incorrect!'
                        });
                    }
                );
            }
        )
    };

    static getUser = (req, res) =>{
        const authToken = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(authToken, JWT_SECRET);
        db.query('SELECT * FROM developer where id=?', decode.id, function (error, result, fields) {
            if (error) throw error;
            return res.status(200).send({success:true, data:result[0], message: 'Fetched Successfully!'});
        })
    };
}

export default userController;