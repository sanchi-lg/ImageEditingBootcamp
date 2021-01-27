const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
  
    tname:{type:String,required:true,unique:true},
    addDet:{type:String},
    timg:{type:String,required:true},
    track:{type:String,required:true},
    instructor:{type:String,required:true},
    sres:{type:Array,default:[]}
})

module.exports=mongoose.model('task',taskSchema)



