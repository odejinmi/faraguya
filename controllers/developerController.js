const Developer = require('../models/developerModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const  jwt = require('jsonwebtoken');
const sendMail = require('../helpers/sendMail');

const { JWT_SECRET } = process.env;

    const register = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: errors.array()
                });
            }
            const {firstname,lastname,email,phonenumber,password} = req.body;

            const isdeveloperexist = await Developer.findOne({email});

            if (isdeveloperexist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Developer already exist!'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            let mailSubject = 'mail Verification';
            const randomToken = randomstring.generate();
            let content = '<p> Hii '+ firstname+' '+ lastname +', \
            Please <a href="http://127.0.0.1:3000/mail-varification?token='+randomToken+'"> Verify</a> your Mail.';
            await sendMail(req.body.email, mailSubject, content);

            const developer = new Developer({
                firstname,
                lastname,
                email,
                phonenumber,
                password: hashedPassword
            });
            const developerData = await developer.save();

            return res.status(200).json({
                success: true,
                msg: 'Registered Successfully!',
                data: developerData
            });

            // db.query(
            //     // `SELECT * FROM developer WHERE LOWER(${db.escape(
            //     //     req.body.email
            //     // )});`,
            //         `SELECT * FROM developer where email =? `, req.body.email,
            //     (err, result) => {
            //         if (result && result.length) {
            //             return res.status(409).send({
            //                 msg: 'This user is already in use! '
            //             });
            //         } else {
            //             bcrypt.hash(req.body.password, 10, (err, hash) => {
            //                 if (err) {
            //                     return res.status(400).send({
            //                         msg: err
            //                     });
            //                 } else {
            //                     db.query(
            //                         `INSERT INTO developer (firstname,lastname,email,phonenumber,password) VALUES ('${req.body.firstname}','${req.body.lastname}',${db.escape(
            //                             req.body.email
            //                         )},'${req.body.phonenumber}',${db.escape(hash)});`,
            //                         (err, result) => {
            //                             if (err) {
            //                                 return res.status(400).send({
            //                                     msg: err
            //                                 })
            //                             }
            //
            //                             let mailSubject = 'mail Verification';
            //                             const randomToken = randomstring.generate();
            //                             // let content = '<p> Hii '+ req.body.name+', \
            //                             // Please <a href="http://127.0.0.1:3000/mail-varification?token='+randomToken+'"> Verify</a> your Mail.';
            //                             // sendMail(req.body.email, mailSubject, content);
            //
            //                             db.query('UPDATE developer set token=? where emal=?', [randomToken, req.body.email], function (error, result, fields) {
            //                                 if (error) {
            //                                     return res.status(400).send({
            //                                         msg: err
            //                                     });
            //                                 }
            //                             });
            //                             return res.status(200).send({
            //                                 msg: 'The user has been registered with us!'
            //                             });
            //                         }
            //                     )
            //                 }
            //             });
            //         }
            //     }
            // );
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const generatetoken= async(developer)=>{
        const token = jwt.sign(developer, JWT_SECRET, {expiresIn: '2h'});
        return token;
    };

    const login = async (req, res) => {

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: errors.array()
                });
            }

            const {email, password} = req.body;

            const developerData = await Developer.findOne({email});

            if (!developerData) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Email or Password is incorrect!'
                });
            }

            const isPasswordMatch = await bcrypt.compare(password, developerData.password);
            if (!isPasswordMatch){
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Email or Password is incorrect!'
                });
            }

            const accessToken = await generatetoken({developer: developerData});

            return res.status(200).json({
                success: true,
                token: accessToken,
                msg: 'Login Successfully!',
                data: developerData
            });

            // db.query(
            //     `SELECT * FROM developer WHERE email = ${db.escape(req.body.email)};`,
            //     (err, result) => {
            //         if (err) {
            //             return res.status(400).send({
            //                 msg: err
            //             });
            //         }
            //
            //         if (!result.length) {
            //             return res.status(401).send({
            //                 msg: 'Email or Password is incorrect!'
            //             });
            //         }
            //
            //         bcrypt.compare(
            //             req.body.password,
            //             result[0]['password'],
            //             (bErr, bResult) => {
            //                 if (bErr) {
            //                     return res.status(400).send({
            //                         msg: bErr
            //                     });
            //                 }
            //                 if (bResult) {
            //                     // console.log(JWT_SECRET);
            //                     const token = jwt.sign({
            //                         id: result[0]['id'],
            //                         is_admin: result[0]['is_admin']
            //                     }, JWT_SECRET, {expiresIn: '1h'});
            //                     db.query(`UPDATE developer SET last_login = now() WHERE id = '${result[0]['id']}'`);
            //
            //                     return res.status(200).send({
            //                         msg: 'Logged In',
            //                         token: token,
            //                         user: result[0]
            //                     })
            //                 }
            //
            //                 return res.status(401).send({
            //                     msg: 'Email or Password is incorrect!'
            //                 });
            //             }
            //         );
            //     }
            // )
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const getdeveloper = (req, res) =>{
        try {
            return res.status(200).json({
                success: true,
                data: req.developer,
                msg: 'Details fetch successfully',
            });
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };


module.exports ={
    register,
    login,
    getdeveloper
};