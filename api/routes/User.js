const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth'); 

const userController = require('../controllers/UserController');
const forgotPasswordController = require('../controllers/ForgotPasswordController');



router.get('/',userController.users_get_all);
router.post('/register', userController.users_add_user);
router.delete('/:userId', checkAuth, userController.users_deleteUser);
router.get('/:userId', userController.users_getUserById);
router.post('/login',userController.users_userLogin)
router.put('/:userId', userController.users_updateUser);

/* Forgot Passord routes */

router.post('/forgotPassword',forgotPasswordController.forgotPassword)
router.post('/resetPassword',forgotPasswordController.resetPassword)


module.exports = router;