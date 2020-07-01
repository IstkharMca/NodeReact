const mongoose = require('mongoose');
const Cart = require('../models/CartItem');

exports.addToCart = (req, res) => {
    
    Cart.findOne({user: req.body.user})
    .exec()
    .then(cartItem => {
        if(cartItem){

            const item = cartItem.cart.find(item => item.product == req.body.product);
            let where, action, set;
            if(item){
                action = "$set";
                where = { "user": req.body.user, "cart.product": req.body.product};
                set = "cart.$";
            } else {
                action = "$push";
                where = { "user": req.body.user };
                set = "cart"
            }

            Cart.findOneAndUpdate(where, {
                [action] : {
                    [set] : {
                        _id: item ? item._id : new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: item ? (item.quantity + req.body.quantity) : req.body.quantity,
                        price: req.body.price,
                        total: item ? req.body.price * (req.body.quantity + item.quantity) : (req.body.price * req.body.quantity)
                    }
                }
            })
            .exec()
            .then(newItem => {
                res.status(201).json({
                    message: newItem,
                })
            })
            .catch(error => {
                res.status(500).json({
                    message: error
                });
            });

            

        }else{
            const newCartItem = new Cart({
                _id: new mongoose.Types.ObjectId(),
                user: req.body.user,
                cart: [
                    {
                        _id: new mongoose.Types.ObjectId(),
                        product: req.body.product,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        total: req.body.quantity * req.body.price
                    }
                ]
            });

            newCartItem
            .save()
            .then(newCart => {
                res.status(201).json({
                    message: newCart
                });
            })
            .catch(error => {
                res.status(500).json({
                    error : error
                });
            });

        }

    })
    .catch(error => {
        res.status(500).json({
            error : error
        });
    });       
}


exports.getAllCart = (req,res) => {
    Cart.find()
            .exec()
            .then((result) =>{
                if (result.length > 0) {
                    return res.status(200).json({
                        SUCCESS : {
                            carts : result,
                            message : 'Cart has bee fetch successfully.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                } else {
                    return res.status(200).json({
                        SUCCESS : {
                            carts : [],
                            message : 'No Record found.'
                        },
                        API_STATUS :'success',
                        STATUS_CODE :200
                    })
                }
            })
}

exports.getUserCartItem = (req,res) => {
    const userId = req.params.userId;

    Cart.find({user: userId})
    .select('_id user cart')
    .populate('cart.product', 'name productPic')
    .exec()
    .then(cartItems => {
        res.status(200).json({
            message: cartItems
        })
    })
}


exports.deleteCartById = (req, res, next) => {
    const id = req.params.cartId;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(200).json({
            ERROR: {
                MESSAGE: 'Invalid object id',
            },
            API_STATUS: "FAIL"
        })
    }

    Cart.findById(id)
        .exec()
        .then(docs => {
            if (docs) {
                // Category.remove({ _id: id })
                Cart.findByIdAndRemove({ _id: id })
                // Category.deleteOne({ _id: id })
                    .exec()
                    .then(result => {
                        if (result) {
                            res.status(200).json({
                                SUCCESS: {
                                    MESSAGE: "Cart Item deleted successfully",
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
