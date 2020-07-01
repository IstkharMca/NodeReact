const mongoose = require('mongoose');
const Product = require('../models/Product');

exports.createproduct = (req, res) => {
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        slug: req.body.slug,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        productPic: req.body.productPic,
        keyword: req.body.keyword,
        category: req.body.category,
    });

    console.log(product);

    product.save()
    .then(product => {
        res.status(201).json({
            message: product
        });
    })
    .catch(er => {
        res.status(500).json({
            error: er.message
        });
    })
    
}


exports.getAllProduct = (req,res) => {
    Product.find()
            .exec()
            .then((result) =>{
                if (result.length > 0) {
                    return res.status(200).json({
                        SUCCESS : {
                            products : result,
                            message : 'Product fetch successfully.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                } else {
                    return res.status(200).json({
                        SUCCESS : {
                            products : [],
                            message : 'No Record found.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                }
            })
}
exports.deleteProduct= (req, res, next) => {
    const id = req.params.productId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(200).json({
            ERROR: {
                MESSAGE: 'Invalida object id',
            },
            API_STATUS: "FAIL"
        })
    }
    Product.findById(id)
        .exec()
        .then(docs => {
            if (docs) {
                // Category.remove({ _id: id })
                Product.findByIdAndRemove({ _id: id })
                // Category.deleteOne({ _id: id })
                    .exec()
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                SUCCESS: {
                                    MESSAGE: "Product deleted successfully",
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

