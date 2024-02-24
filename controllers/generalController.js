const Newsletter = require('../models/newsletterModel');
const  {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");

const subscribe = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            success: false,
            msg: 'Errors',
            errors: errors.array()
        });
    }

    const {email} = req.body;
    const isClientexist = await Newsletter.findOne({email});
    if (isClientexist && isClientexist.subscribe) {
        return res.status(200).json({
            success: false,
            msg: 'Errors',
            errors: 'You have already Subscribe to our newsletter'
        });
    }else if (isClientexist && !isClientexist.subscribe) {
        const updatenewsletter = {
            email,
            subscribe:true
        };
        const newsletterData = await Newsletter.findOneAndUpdate({email:email},{
            $set: updatenewsletter
        }, {new:true});
        return res.status(200).json({
            success: true,
            msg: 'You have Successfully subscribe to our newsletter!',
            // data: newsletterData
        });
    }

    const newsletter = new Newsletter({
        email
    });
    const newsletterData = await newsletter.save();

    return res.status(200).json({
        success: true,
        msg: 'You have Successfully subscribe to our newsletter!',
        // data: newsletterData
    });
};

const unsubscribe = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(200).json({
            success: false,
            msg: 'Errors',
            errors: errors.array()
        });
    }

    const {email} = req.body;
    const isClientexist = await Newsletter.findOne({email});
    if (!isClientexist) {
        return res.status(200).json({
            success: false,
            msg: 'Errors',
            errors: 'You have not yet Subscribe to our newsletter'
        });
    }else if (isClientexist && !isClientexist.subscribe) {

        return res.status(200).json({
            success: false,
            msg: 'Errors',
            errors: 'You have already  Unsubscribe from our newsletter'
            // data: newsletterData
        });
    }
    const updatenewsletter = {
        email,
        subscribe:false
    };
    const newsletterData = await Newsletter.findOneAndUpdate({email:email},{
        $set: updatenewsletter
    }, {new:true});

    return res.status(200).json({
        success: true,
        msg: 'You have Successfully unsubscribe to our newsletter!',
        // data: newsletterData
    });
};


module.exports = {
    subscribe,
    unsubscribe
};