const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : Number
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ["superadmin","organizer","other"],
        default : 'organizer'
    },
    eventLimit : {
        type : Number,
        default : 1
    },
    eventCreted : {
        type : Number,
        default : 0
    },
    branding : {
        companyName : {
            type : String
        },
        logo : {
            type : String
        }
    },
    whatsappNumber : {
        type : Number
    },
    isBlocked : {
        type : Boolean,
        default :false
    }
}, {Timestamp :true})

const User = mongoose.model('User',userSchema);

module.exports = User;