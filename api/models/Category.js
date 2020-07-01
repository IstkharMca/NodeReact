const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{ 
        type : String,
         required: true
        },
    slug: { type : String, 
        required: true
    },
    
    title: {
         type : String,
          required: true
        },
    status: { 
        type: String, 
        enum: ['Active', 'Inactive'],
        default: 'Active' 
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

module.exports = mongoose.model('Category', CategorySchema);