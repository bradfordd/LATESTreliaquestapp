const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const registerSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
       type:String,
       required: true 
    },
    teacher:{
        type:Boolean,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
