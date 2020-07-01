const mongoose = require('mongoose');
const Category = require('../models/Category');

exports.getAllCategory = (req,res) => {
    Category.find()
            .exec()
            .then((result) =>{
                if (result.length > 0) {
                    return res.status(200).json({
                        SUCCESS : {
                            categories : result,
                            message : 'Category fetch successfully.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                } else {
                    return res.status(200).json({
                        SUCCESS : {
                            categories : [],
                            message : 'No Record found.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                }
            })
}

exports.deleteAllCategory = (req,res) => {
    Category.deleteMany({})
            .exec()
            .then((result) =>{
                console.log(`response after deletions- ${result}`);
                if (result) {
                    return res.status(200).json({
                        SUCCESS : {
                            message : 'All category has been deleted successfully.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                } else {
                    return res.status(200).json({
                        SUCCESS : {
                            message : 'Sorry categories is not deleted, Please verify details.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                }
            })
}

exports.createCategory = (req, res) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        slug: req.body.slug,
        title: req.body.title,
    });

    Category.find({name:req.body.name})
    .exec()
    .then((result) => {
        console.log(result.length > 0);
        if (result.length > 0) {
            // res.status(200).json({
            //     message : 'Category name has been taken already'
            // })
            res.status(201).json({
                SUCCESS: {
                    MESSAGE: "Category has been created successfully"
                },
                API_STATUS: "SUCCESS",
            });

        } else {
        category.save()
            .then(cat => {
             res.status(201).json({
                SUCCESS: {
                    category: cat,
                    MESSAGE: "Category has been created successfully"
                },
                API_STATUS: "SUCCESS",
            });
          }).catch((error) => {
              res.status(500).json({
                message : error.message,
             })
           })
        }
    })
    
}

exports.deleteCategory = (req, res, next) => {
    const id = req.params.categoryId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(200).json({
            ERROR: {
                MESSAGE: 'Invalida object id',
            },
            API_STATUS: "FAIL"
        })
    }
    Category.findById(id)
        .exec()
        .then(docs => {
            if (docs) {
                // Category.remove({ _id: id })
                Category.findByIdAndRemove({ _id: id })
                // Category.deleteOne({ _id: id })
                    .exec()
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                SUCCESS: {
                                    MESSAGE: "Category deleted successfully",
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
                        res.status(500).json({
                            message : err,
                            response : 'Error in deleting'
                        })
                    })
            }
            else {
                res.status(400).json({
                    ERROR: {
                        MESSAGE: " does not exist"
                    },
                    API_STATUS: "FAIL"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                ERROR: {
                    MESSAGE: err
                },
                API_STATUS: "FAIL"
            })
        });
}
