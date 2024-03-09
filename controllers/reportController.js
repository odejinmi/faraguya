const Report = require('../models/reportModel');
const {validationResult} = require('express-validator');


    const fetchreports = async (req, res) => {
        try {

            const stacks = await Report.find({});

            return res.status(200).json({
                success: true,
                msg: 'Report Fetched Successfully',
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

    const fetchreport = async (req, res) => {
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

            const task = await Report.findOne({ _id: id });
            if (!task) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Report ID not found'
                });
            }

            return res.status(200).json({
                success: true,
                msg: 'Report Fetched Successfully',
                data: task
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

    const updatereport = async (req, res) => {
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
            const {id, title} = req.body;
            const istaskExist = await Report.findOne({_id:id});
            if (!istaskExist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Report ID not found'
                });
            }
            const isTitleAssigned = await Report.findOne({_id:{$ne: id}, title});
            if (!isTitleAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Report name already exist'
                });
            }
            const updatetask = {
                name
            };
            const taskData = await Report.findByIdAndUpdate({_id:id},{
                $set: updatetask
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Report updated Successfully!',
                data: taskData
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const deletereport = async (req, res) => {
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

            const isExisttask = await Report.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success: true,
                msg: 'Report Deleted Successfully!',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Report ID not found',
            });
        }
    };

    const createreport = async (req, res) => {
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
            const {title,reporter_id,report_image,description,report_id,sent_to,date,status} = req.body;
            const isExisttask = await Report.findOne({title});
            if (isExisttask){
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Report already exist!'
                });
            }
            const stack = new Report({
                title,
                reporter_id,
                description,
                report_id,
                sent_to,
                date,
                status,
                // icon:'images/'+name+'.jpg'
                report_image:'images/'+req.file.filename
            });
            const stackData = await stack.save();
            return res.status(200).json({
                success: true,
                msg: 'Report created Successfully!',
                data: stackData
            });
        }catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

module.exports = {
    fetchreports,
    fetchreport,
    updatereport,
    deletereport,
    createreport
};