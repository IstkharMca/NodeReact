
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailId = process.env.MAILER_EMAIL_ID || 'auth_email_address@gmail.com';
const password = process.env.MAILER_PASSWORD || 'auth_email_pass';
const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport({
    service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
    auth: {
      user: emailId,
      pass: password
    }
  });

  

const User = require('../models/User');

exports.users_get_all =  (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            if (result.length > 0) {
                response = {
                    Users: result.map(result => {
                        return {
                            first_name: result.first_name,
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/api/users/" + result._id
                            }
                        }
                    })
                }
                res.status(200).json({
                    SUCCESS: {
                        count: result.length,
                        users: response, // it will works 
                        users: result.map(result => {
                            return {
                                first_name: result.first_name,
                                last_name: result.last_name,
                                email: result.email,
                                mobile: result.mobile,
                                address: result.address,
                                resetPasswordToken:result.resetPasswordToken,
                                request: {
                                    type: "GET",
                                    url: "http://localhost:3000/api/users/" + result._id
                                },
                                body: {
                                    first_name: 'String',
                                    last_name: 'String',
                                    email: "String"
                                }
                            }
                        }),
                        MESSAGE: "Listing Successfull"
                    },
                    API_STATUS: "SUCCESS"
                });
            }
            else {
                res.status(200).json({
                    SUCCESS: {
                        MESSAGE: "No users found"
                    },
                    API_STATUS: "SUCCESS"
                });
            }
        })
        .catch(err => {
            res.status(401).json({
                ERROR: {
                    MESSAGE: err,
                },
                API_STATUS: "FAIL"
            });
        });
}

// 
exports.users_add_user = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(userExists => {
            if (userExists.length) {
                res.status(409).json({
                    ERROR: {
                        MESSAGE: 'email already exists'
                    },
                    API_STATUS: 'FAIL'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            ERROR: {
                                MESSAGE: err
                            },
                            API_STATUS: 'FAIL'
                        });
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hash,
                            mobile: req.body.mobile,
                            address: req.body.address
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    SUCCESS: {
                                        Userdata: result,
                                        MESSAGE: "User created Successfully"
                                    },
                                    API_STATUS: "SUCCESS",
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    ERROR: {
                                        MESSAGE: err
                                    },
                                    API_STATUS: 'FAIL'
                                });
                            });
                    }
                });
            }
        })
}
exports.users_deleteUser = (req, res, next) => {
    const id = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(200).json({
            ERROR: {
                MESSAGE: 'Invalida object id',
            },
            API_STATUS: "FAIL"
        })
    }
    User.findById(id)
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs) {
                User.remove({ _id: id })
                    .exec()
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                SUCCESS: {
                                    MESSAGE: "User  Deleted Successfully",
                                },
                                API_STATUS: "SUCCESS"
                            })
                        }
                        else {
                            res.status(200).json({
                                message: "error in deleting"
                            });
                        }
                    })
                    .catch(err => {
                        res.status(500)
                    })
            }
            else {
                res.status(400).json({
                    ERROR: {
                        MESSAGE: "User id does not exist"
                    },
                    API_STATUS: "FAIL"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ERROR: {
                    MESSAGE: err
                },
                API_STATUS: "FAIL"
            })
        });
}

exports.users_getUserById = (req, res, next) => {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(200).json({
            ERROR: {
                MESSAGE: 'Invalida object id',
            },
            API_STATUS: "FAIL"
        })
    }
    User.findById(userId)
        .exec()
        .then(docs => {
            if (docs) {
                res.status(200).json({
                    SUCCESS: {
                        user: docs,
                    },
                    API_STATUS: "SUCCESS"
                })
            }
            else {
                res.status(400).json({
                    ERROR: {
                        MESSAGE: "no record"
                    },
                    API_STATUS: "FAIL"
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                ERROR: {
                    MESSAGE: err
                },
                API_STATUS: 'FAIL'
            });
        });
}

exports.users_userLogin =  (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    ERROR: {
                        MESSAGE: 'Auth Failed , user does not exist'
                    },
                    API_STATUS: 'FAIL'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(404).json({
                        ERROR: {
                            MESSAGE: 'Invalid Password'
                        },
                        API_STATUS: 'FAIL'
                    });
                }
                if (result) {
                   const token =  jwt.sign({
                        email : user[0].email,
                        userId : user[0]._id
                    },
                    'secret',
                    {
                        expiresIn : "1h"
                    }
                    );
                    return res.status(200).json({
                        SUCCESS: {
                            MESSAGE: 'Auth Successfull',
                            data : {
                               user : user,
                               token : token
                            }
                        },
                        API_STATUS: 'SUCCESS'
                    });
                }

                res.status(404).json({
                    ERROR: {
                        MESSAGE: 'Auth Failed,Wrong email-id and password'
                    },
                    API_STATUS: 'FAIL'
                });

            });
        })
}

exports.users_updateUser = (req, res, next) => {

    res.status(200).json({
        messag: "Data updated successfully  - " + req.params.userId
    })
}

exports.forgotPassword = (req, res, next) => {
    var mailOptions = {
        to: 'istkharali1991@gmail.com',
        from: emailId,
        subject: 'Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://localhost:4000/password-reset/token\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.json({info: 'An e-mail has been sent to istkharali1991 with further instructions.'});
        done(err, 'done');
      });
}

// http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
//https://www.c-sharpcorner.com/blogs/forgot-password-email-notification-using-node-js
//https://meanstackdeveloper.in/implement-reset-password-functionality-in-node-js-express.html