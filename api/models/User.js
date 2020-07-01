const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name:{ 
        type : String,
         required: true
        },
    last_name: { type : String, 
        required: true
    },
    password: { 
        type : String,
         required: true
        },
    email: { 
        type : String, 
        required: true, 
        unique : true,
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    mobile: {
         type : Number,
          required: true
        },
    address: { 
        type : String, 
        required: true
    },
    status: { 
        type: String, 
        enum: ['Active', 'Inactive'],
        default: 'Inactive' 
    },
    is_verified: { 
        type: Number, 
       // enum: ['1', '0'], 
        default: '0' 
    },
    is_email_verified: { 
        type: Number,
         //enum: ['1', '0'], 
         default: '0' 
        },
    is_mobile_verified: { 
        type: Number, 
        //enum: ['1', '0'], 
        default: '0' 
    },
    resetPasswordToken: { 
        type: String, 
        default: null 
    },
    resetPasswordExpires: { 
        type: String,  
        default: null
    },
    created_at: { 
        type: Date, 
        required: true, 
        default: Date.now
     },
    update_at: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
    deleted_at: { 
        type: Date, 
        default: null
    },
});

module.exports = mongoose.model('User', UserSchema);