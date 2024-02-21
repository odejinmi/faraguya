import db from "../config/dbConnection.js";
import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import randomstring from "randomstring";
import jwt from "jsonwebtoken";

class companyController {

    static register = (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        db.query(
            `SELECT * FROM company where workemail =? `,req.body.workemail,
            (err, result)=>{
                if(result && result.length){
                    return res.status(409).send({
                        msg: 'This Company is already in use! '
                    });
                }else{
                    bcrypt.hash(req.body.password, 10, (err,hash)=>{
                        if (err){
                            return res.status(400).send({
                                msg:err
                            });
                        }else{
                            const randomToken = randomstring.generate();
                            db.query(
                                `INSERT INTO company (workemail,phonenumber,years_of_experience,hourly_budget,monthly_budget, call_date,stack,token,password) VALUES (${db.escape(
                                    req.body.workemail
                                )},'${req.body.phonenumber}','${req.body.yearsofexperience}','${req.body.hourlybudget}','${req.body.monthlybudget}','${req.body.calldate}','${JSON.stringify(req.body.stack)}','${randomToken}',${db.escape(hash)});`,
                                (err, result) => {
                                    if (err){
                                        return res.status(400).send({
                                            msg:err
                                        })
                                    }



                                    // let mailSubject = 'mail Verification';
                                    // let content = '<p> Hii '+ req.body.name+', \
                                    // Please <a href="http://127.0.0.1:3000/mail-varification?token='+randomToken+'"> Verify</a> your Mail.';
                                    // sendMail(req.body.email, mailSubject, content);

                                    // db.query('UPDATE developer set token=? where emal=?',[randomToken,req.body.email],function(error, result,fields) {
                                    //     if(error){
                                    //         return res.status(400).send({
                                    //             msg:err
                                    //         });
                                    //     }
                                    // });
                                    return res.status(200).send({
                                        msg:'The Company has been registered with us!'
                                    });

                                }
                            )
                        };
                    });
                }
            }
        );
    };

    static getUser = (req, res) =>{
        db.query('SELECT * FROM company ', function (error, result, fields) {
            if (error) throw error;
            return res.status(200).send({success:true, data:result, message: 'Fetched Successfully!'});
        })
    };

    static fetchcompany = (req, res) => {
        const sql = "SELECT * FROM company WHERE ID = ?";
        const id = req.params.id;

        db.query(sql, [id],(err, result)=> {
            if (err) return res.json({Message: "Error inside server"});
            return res.status(200).send({
                msg:result
            });
        })
    };
}


export default companyController;