const mongoose = require('mongoose')

const DistributorSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    distributionLocation:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isDistributor:{
        type:Boolean,
        default:true
    }
},
timestamps = true
)

const Distributor = mongoose.model("Distributor",DistributorSchema)
module.exports = Distributor