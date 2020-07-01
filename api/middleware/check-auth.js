const jwt = require('jsonwebtoken');
module.exports = (req , res, next) =>{
   try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret');
        req.userData = decoded;
        next();
   }
   catch(error) {
    res.status(200).json({
        ERROR: {
            MESSAGE: 'Auth Failed'
        },
        API_STATUS: "FAIL"
    });
   }
};