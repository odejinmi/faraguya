const Task = require('../models/taskModel');
const {validationResult} = require('express-validator');


    const fetchtasks = async (req, res) => {
        try {

            const stacks = await Task.find({});

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

            const task = await Task.findOne({ _id: id });
            if (!task) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task ID not found'
                });
            }

            return res.status(200).json({
                success: true,
                msg: 'Task Fetched Successfully',
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
            const istaskExist = await Task.findOne({_id:id});
            if (!istaskExist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task ID not found'
                });
            }
            const isTitleAssigned = await Task.findOne({_id:{$ne: id}, status});
            if (!isTitleAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task is already in the progress position'
                });
            }
            const updatetask = {
                status
            };
            const taskData = await Task.findByIdAndUpdate({_id:id},{
                $set: updatetask
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Task updated Successfully!',
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
            const istaskExist = await Task.findOne({_id:id});
            if (!istaskExist) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task ID not found'
                });
            }
            const isTitleAssigned = await Task.findOne({_id:{$ne: id}, title});
            if (!isTitleAssigned) {
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task name already exist'
                });
            }
            const updatetask = {
                name
            };
            const taskData = await Task.findByIdAndUpdate({_id:id},{
                $set: updatetask
            }, {new:true});


            return res.status(200).json({
                success: true,
                msg: 'Task updated Successfully!',
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

            const isExisttask = await Task.findByIdAndDelete({_id:id});

            return res.status(200).json({
                success: true,
                msg: 'Task Deleted Successfully!',
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                msg: 'Task ID not found',
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
            const {title, description, developers, start_date, due_date, available,} = req.body;
            const isExisttask = await Task.findOne({title});
            if (isExisttask){
                return res.status(200).json({
                    success: false,
                    msg: 'Errors',
                    errors: 'Task already exist!'
                });
            }
            const stack = new Stack({
                title,
                description,
                developers,
                start_date,
                due_date,
                available,
                // icon:'images/'+name+'.jpg'
                task_image:'images/'+req.file.filename
            });
            const stackData = await stack.save();
            return res.status(200).json({
                success: true,
                msg: 'Task created Successfully!',
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