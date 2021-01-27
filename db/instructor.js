const mongoose=require('mongoose')
const instructorSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    name:{type:String,required:true},
     password:{type:String,required:true},
    tasks:{type:Array,default:[]},



})

module.exports=mongoose.model('instructor',instructorSchema)