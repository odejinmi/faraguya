const Subtask = require('../models/subtaskModel');
const Task = require('../models/taskModel');
const {validationResult} = require('express-validator');


    const fetchtasks = async (req, res) => {
        try {

            const stacks = await Subtask.find({});

            return res.status(200).json({
                success: true,
                msg: 'Tasks Fetched Successfully',
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

    const fetchtask = async (req, res) => {
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

            const subtask = await Subtask.findOne({ _id: id });
            if (!subtask) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Subtask ID not found'
                });
            }

            return res.status(200).json({
                success: true,
                msg: 'Subtask Fetched Successfully',
                data: subtask
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

    const updatetaskprogress = async (req, res) => {
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
            const {id, status} = req.body;
            const istaskExist = await Subtask.findOne({_id:id});
            if (!istaskExist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Subtask ID not found'
                });
            }
            const isTitleAssigned = await Subtask.findOne({_id:{$ne: id}, status});
            if (isTitleAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Subtask is already in the progress position'
                });
            }
            const updatetask = {
                status
            };
            const taskData = await Subtask.findByIdAndUpdate({_id:id},{
                $set: updatetask
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Subtask updated Successfully!',
                data: taskData
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const updatetask = async (req, res) => {
        console.log("res");
        console.log(req.body);
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
            const istaskExist = await Subtask.findOne({_id:id});
            if (!istaskExist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Subtask ID not found'
                });
            }
            const isTitleAssigned = await Subtask.findOne({_id:{$ne: id}, title});
            if (isTitleAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Subtask name already exist'
                });
            }
            const updatetask = {
                title
            };
            const taskData = await Subtask.findByIdAndUpdate({_id:id},{
                $set: updatetask
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Subtask updated Successfully!',
                data: taskData
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    };

    const deletetask = async (req, res) => {
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

            const isExisttask = await Subtask.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success: true,
                msg: 'Subtask Deleted Successfully!',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Subtask ID not found',
            });
        }
    };

    const createtask = async (req, res) => {
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
            const {title,
                description,
                developers, start_date,
                due_date, available,
                task_id
            } = req.body;
            const isExistsubtask = await Subtask.findOne({title});
            if (isExistsubtask){
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Subtask already exist!'
                });
            }
            const isExisttask = await Task.findOne({_id:task_id});
            if (!isExisttask){
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task did not exist!'
                });
            }
            const stack = new Subtask({
                title,
                description,
                developers,
                start_date,
                due_date,
                available,
                task_id,
                // icon:'images/'+name+'.jpg'
                task_image:'images/'+req.file.filename
            });
            const stackData = await stack.save();
            return res.status(200).json({
                success: true,
                msg: 'Subtask created Successfully!',
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
    fetchtasks,
    fetchtask,
    updatetaskprogress,
    updatetask,
    deletetask,
    createtask
};