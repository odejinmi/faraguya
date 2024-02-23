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
    const isClientexist = await Client.findOne({email});
    if (isClientexist) {
        return res.status(200).json({
            success: false,
            msg: 'Errors',
            errors: 'You have already Subscribe to our newsletter'
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

module.exports = {
    subscribe
};