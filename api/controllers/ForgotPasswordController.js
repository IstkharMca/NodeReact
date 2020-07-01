
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const emailId = process.env.MAILER_EMAIL_ID || 'qversity.test.mail@gmail.com';
const password = process.env.MAILER_PASSWORD || 'qversity@123';
const nodemailer = require('nodemailer');
const siteUrl = process.env.SITE_URL
const reserPasswordUrl = 'reset-password';
const crypto = require('crypto')

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
        user: emailId,
        pass: password
    }
});

exports.forgotPassword = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then((result) => {
            if (result.length > 0) {
                token = crypto.randomBytes(32).toString('hex');
                User.updateOne({ email: req.body.email }, { $set: { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 } })
                    .exec()
                    .then((response) => {
                        let recoverPasswordUrl = `${siteUrl}/${reserPasswordUrl}/${token}`;
                        var mailOptions = {
                            to: req.body.email,
                            from: emailId,
                            subject: 'Password Reset',
                            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                                '' + recoverPasswordUrl + '\n\n' +
                                'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                        };
                        smtpTransport.sendMail(mailOptions, function (err) {
                            if (err) {
                                console.log(err.message);
                            } else {
                                console.log('req');
                            }
                            res.status(201).json({ message: `An e-mail has been sent to ${result[0].email} with further instructions.` });
                        });
                        res.status(201).json({ message: `An e-mail has been sent to ${result[0].email} with further instructions.` });
                    }).catch((error) => {
                        res.status(404).json({
                            response: error.message,
                            statusCode: 404,
                            message: 'Email is not send, Please check your details'
                        })
                    })
            } else {
                res.status(404).json({ status_code: 404, message: 'Email id not exists, Please try different email-id' });
            }
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        })
}

exports.resetPassword = (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } })
            .exec()
            .then((user) => {
                if (user == null) {
                    res.status(404).json({ status_code: 404, message: "In-valid token or taken has been expired." })
                } else {
                    user.password = hash;
                    user.resetPasswordToken = null;
                    user.resetPasswordExpires = null;
                    user.save()
                        .then((result) => {
                            var mailOptions = {
                                to: user.email,
                                from: emailId,
                                subject: 'Your password has been changed',
                                text: 'Hello,\n\n' +
                                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
                            };
                            
                            smtpTransport.sendMail(mailOptions, function (err,) {
                                res.status(201).json({ message: 'Your passwors has been updated successfully' });
                            });
                        })
                        .catch((errors) => {
                            console.log(errors);
                        })
                }
            });
    });
}