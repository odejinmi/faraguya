const Client = require('../models/clientModel');
const  {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const sendMail = require('../helpers/sendMail');


    const register = async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const {workemail,phonenumber,years_of_experience,hourly_budget,monthly_budget, call_date,stack,password} = req.body;
        const isClientexist = await Client.findOne({workemail});
        if (isClientexist) {
            return res.status(200).json({
                success: false,
                msg: 'Errors',
                errors: 'Client already exist!'
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const randomToken = randomstring.generate();
        const client = new Client({
            workemail,
            phonenumber,
            stack,
            years_of_experience,
            hourly_budget,
            monthly_budget,
            randomToken,
            call_date,
            password: hashedPassword
        });
        const clientData = await client.save();

        let mailSubject = 'Successful Registration';
        let content = '<p> Hii '+ workemail+' '+', \
             Your registration is succesfull. Our Admin will reach out to you';
        await sendMail(req.body.email, mailSubject, content);

        let mailSubject1 = 'Meeting schedule';
        let content1 = '<p> Hii Admin a meet has been schedule by '+ workemail+' ' +' on ' + call_date +', \
             Please reach out to the person has soon has possible';
        await sendMail('odejinmitolulopeabraham@gmail.com', mailSubject1, content1);

        return res.status(200).json({
            success: true,
            msg: 'Registered Successfully!',
            data: clientData
        });
    };

    const getclients = async (req, res) => {

        try {

            const clients = await Client.find({});

            return res.status(200).json({
                success: true,
                msg: 'Client Fetched Successfully',
                data: clients
            });
            // db.query('SELECT * FROM company ', function (error, result, fields) {
            //     if (error) throw error;
            //     return res.status(200).send({success:true, data:result, message: 'Fetched Successfully!'});
            // })
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }

    };

    const fetchclient = async (req, res) => {
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

            const client = await Client.findOne({_id: id});
            if (!client) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Client ID not found'
                });
            }

            return res.status(200).json({
                success: true,
                msg: 'Client Fetched Successfully',
                data: client
            })

        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: "Client ID not found",
            });
        }

    };

    const updateclient = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: errors.array()[0]["msg"]
                });
            }
            const {id, workemail,phonenumber,years_of_experience,hourly_budget,monthly_budget, call_date,stack,password} = req.body;
            const isclientexist = await Client.findOne({_id:id});
            if (!isclientexist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Client ID not found'
                });
            }
            const isNameAssigned = await Client.findOne({_id:{$ne: id}, workemail});
            if (!isNameAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Client name already exist'
                });
            }
            const updateclient = {
                workemail,
                phonenumber,
                years_of_experience,
                hourly_budget,
                monthly_budget,
                call_date,
                stack,
                password
            };
            const clientData = await Client.findByIdAndUpdate({_id:id},{
                $set: updateclient
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Client udated Successfully!',
                data: clientData
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const deleteclient = async (req, res) => {
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

            await Client.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success: true,
                msg: 'Client Deleted Successfully!',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Client ID not found',
            });
        }
    };


module.exports = {
    register,
    getclients,
    fetchclient,
    updateclient,
    deleteclient
};