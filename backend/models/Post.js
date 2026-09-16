import mongoose from 'mongoose';
const postSchema=new mongoose.Schema({
 title:{type:String,required:true},content:{type:String,required:true},author:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
 attachment:{url:{type:String,default:''},fileName:{type:String,default:''},fileType:{type:String,default:''}},
 comments:[{user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},text:{type:String,required:true},createdAt:{type:Date,default:Date.now}}]
},{timestamps:true});
export default mongoose.model('Post',postSchema);
