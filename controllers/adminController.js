const Stack = require('../models/stackModel');
const Admin = require('../models/adminModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');


    const fetchstacks = async (req, res) => {
        try {

            const stacks = await Stack.find({});

            return res.status(200).json({
                success: true,
                msg: 'Stacks Fetched Successfully',
                data: stacks
            })
            // const sql = "SELECT * FROM stack";
            // db.query(sql, (err, result)=> {
            //     if (err) return res.json({msg: "Error inside server"});
            //     // console.log(result);
            //     // return res.json(result);
            //     return res.status(200).send({
            //         msg:result
            //     });
            // })
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const fetchstack = async (req, res) => {
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

            const stack = await Stack.findOne({ _id: id });
            if (!stack) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Stack ID not found'
                });
            }

            return res.status(200).json({
                success: true,
                msg: 'Stacks Fetched Successfully',
                data: stack
            })

            // const sql = "SELECT * FROM stack WHERE ID = ?";
            // const id = req.params.id;
            //
            // db.query(sql, [id],(err, result)=> {
            //     if (err) return res.json({Message: "Error inside server"});
            //     return res.status(200).send({
            //         msg:result
            //     });
            // })
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const updatestack = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: errors.array()[0]["msg"]
                });
            }
            // const sql = "UPDATE stack SET `stackname`=? WHERE ID = ?";
            // const id = req.params.id;
            //
            // db.query(sql, [req.body.name, id],(err, result)=> {
            //     if (err) return res.json({Message: "Error inside server"});
            //     return res.status(200).send({
            //         msg:"Stack Updated succesfully"
            //     });
            // })
            const {id, name} = req.body;
            const isExiststack = await Stack.findOne({_id:id});
            if (!isExiststack) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Stack ID not found'
                });
            }
            const isNameAssigned = await Stack.findOne({_id:{$ne: id}, name});
            if (!isNameAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Stack name already exist'
                });
            }
            const updatestack = {
                name
            };
            const stackData = await Stack.findByIdAndUpdate({_id:id},{
                $set: updatestack
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Stack udated Successfully!',
                data: stackData
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const deletestack = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: errors.array()[0]["msg"]
                });
            }

            const {id} = req.params;

            const isExiststack = await Stack.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success: true,
                msg: 'Stack Deleted Successfully!',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Stack ID not found',
            });
        }
    };

    const createstack = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: errors.array()[0]["msg"]
                });
            }
            // const sql = `INSERT INTO stack (stackname) VALUES ('${req.body.name}')`;
            // const values = [
            //     req.name
            // ];
            // db.query(sql,  (err, result) => {
            //     if (err) return res.json(err);
            //     return res.status(200).send({
            //         msg:"Stack created succesfully"
            //     });
            // })
            const {name} = req.body;
            const isExiststack = await Stack.findOne({name});
            if (isExiststack){
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Stack already exist!'
                });
            }
            const stack = new Stack({
                name,
                // icon:'images/'+name+'.jpg'
                icon:'images/'+req.file.filename
            });
            const stackData = await stack.save();
            return res.status(200).json({
                success: true,
                msg: 'Stack created Successfully!',
                data: stackData
            });
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

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
            const {email,phonenumber,password,Registered_on} = req.body;

            const isdeveloperexist = await Admin.findOne({email});

            if (isdeveloperexist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Admin already exist!'
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            let mailSubject = 'Successful Registration';
            const randomToken = randomstring.generate();
            // let content = '<p> Hii '+ firstname+' '+ lastname +', \
            //      Your registration is succesfull.';
            // // let content = '<p> Hii '+ firstname+' '+ lastname +', \
            // // Please <a href="http://127.0.0.1:3000/mail-varification?token='+randomToken+'"> Verify</a> your Mail.';
            // await sendMail(req.body.email, mailSubject, content);

            const developer = new Admin({
                email,
                Registered_on,
                password: hashedPassword
            });
            const developerData = await developer.save();

            return res.status(200).json({
                success: true,
                msg: 'Registered Successfully!',
                data: developerData
            });

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

            const developerData = await Admin.findOne({email});

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

            const updatetask = {
                token: accessToken
            };
            const taskData = await Admin.findByIdAndUpdate({_id:developerData.id},{
                $set: updatetask
            }, {new:true});

            return res.status(200).json({
                success: true,
                msg: 'Login Successfully!',
                data: taskData
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
        const isdeveloperexist = await Admin.findOne({adminEmail});
        const today = new Date();
        if (isdeveloperexist) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: 'Admin already exist!'
            });
        }
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const developer = new Admin({
            "email": adminEmail,
            Registered_on: today,
            password: hashedPassword
        });
        developer.save()
            .then(() => console.log('Admin user created successfully!'))
            .catch(err => console.error(err));

    };

module.exports = {
    fetchstacks,
    fetchstack,
    updatestack,
    createstack,
    deletestack,
    register,
    login,
    createadmin,
};