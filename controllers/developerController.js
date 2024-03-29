const Developer = require('../models/developerModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const  jwt = require('jsonwebtoken');
const sendMail = require('../helpers/sendMail');
const Chat = require("../models/chatModel");
const Client = require("../models/clientModel");
const MongoClient = require('mongodb').MongoClient;
const child_process = require('child_process');
require("dotenv").config();

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
            const {firstname,lastname,email,phonenumber,password,Registered_on} = req.body;

            const isdeveloperexist = await Developer.findOne({email});

            if (isdeveloperexist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Developer already exist!'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            let mailSubject = 'Successful Registration';
            const randomToken = randomstring.generate();
            let content = '<p> Hii '+ firstname+' '+ lastname +', \
             Your registration is succesfull.';
            // let content = '<p> Hii '+ firstname+' '+ lastname +', \
            // Please <a href="http://127.0.0.1:3000/mail-varification?token='+randomToken+'"> Verify</a> your Mail.';
            await sendMail(req.body.email, mailSubject, content);

            const developer = new Developer({
                firstname,
                lastname,
                email,
                phonenumber,
                Registered_on,
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
        const expiresIn = '2h'; // Set expiration to 1 minute (adjust as needed)

        const options = {
            algorithm: 'HS256', // Use HS256 for a good balance of security and size
            expiresIn, // Include expiration time in options
            issuer: 'your_app_name', // Optionally set issuer for better validation
            subject: 'developer-auth' // Optionally set subject for context
        };
        const token = jwt.sign(developer, JWT_SECRET, options);
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

            // const updatetask = {
            //     token: accessToken
            // };
            // const taskData = await Developer.findByIdAndUpdate({_id:developerData.id},{
            //     $set: updatetask
            // }, {new:true});

            return res.status(200).json({
                success: true,
                msg: 'Login Successfully!',
                token: accessToken,
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
    const getalldeveloper = async (req, res) => {
        try {
            const developer = await Developer.find({});
            return res.status(200).json({
                success: true,
                data: developer,
                msg: 'Details fetch successfully',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const fetchdeveloper = async (req, res) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {id} = req.params;

        const client = await Developer.findOne({_id: id});
        if (!client) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: 'Developer ID not found'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'Developer Fetched Successfully',
            data: client
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Client ID not found",
        });
    }

};

    const getmessages = async (req, res) => {
        try {
            const {userId} = req.params

            console.log(userId);
            const myuserData = req.developer;
            console.log(myuserData._id);
            const messages = await Chat.find({
                sender_id:{$in:[userId, myuserData._id]},
                receiver_id: {$in: [userId, myuserData._id]}
            }).sort({createdAt: -1});

            return res.status(200).json({
                success: true,
                data: messages,
                msg: 'Messages fetch successfully',
            });
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const getgroupmessages = async (req, res) => {
        try {
            const {userId} = req.params

            console.log(userId);
            const myuserData = req.developer;
            console.log(myuserData._id);
            const messages = await Chat.find({
                task_id: userId,
            }).sort({createdAt: -1});

            return res.status(200).json({
                success: true,
                data: messages,
                msg: 'Messages fetch successfully',
            });
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };


const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL;

const createadmin = async () => {
    const isdeveloperexist = await Developer.findOne({email: adminEmail});
    const today = new Date();
    if (!isdeveloperexist) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const developer = new Developer({
            email: adminEmail,
            Registered_on: today,
            password: hashedPassword,
            firstname:"tolulope",
            lastname:"odejinmi",
            phonenumber: "07064257276",
            role: 1
        });
        developer.save()
            .then(() => console.log('Admin user created successfully!'))
            .catch(err => console.error(err));
    }

};

const emptyDatabase = async function () {
    let client
    try {

        const client = await MongoClient.connect(process.env.DATABSE_URL);
        const db = client.db("fagaruya"); // Replace with your database name
        await db.dropDatabase();
        console.log("Database dropped successfully!");
    } catch (error) {
        console.error("Error dropping database:", error);
    } finally {
        // await client.close();
    }
}

function restartNodeApp() {
    process.exit(1); // Exit the current process

    // Assuming your main script file is named 'app.js'
    const scriptPath = 'node app.js';
    child_process.spawn(scriptPath, [], { detached: true }); // Start a new process detached from the current one
}
module.exports ={
    register,
    login,
    getdeveloper,
    getalldeveloper,
    getmessages,
    getgroupmessages,
    fetchdeveloper,
    createadmin,
    emptyDatabase
};