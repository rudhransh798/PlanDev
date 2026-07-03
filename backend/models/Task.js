import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : false,
        default : ''
    },
    priority : {
        type : String,
        enum : ['low' , 'medium' , 'high'],
        default : 'medium'
    },
    label : {
        type : String,
        required : false,
        default : ''
    },
    dueDate : {
        type : String,
        required : false,
    },
    columnId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Column'
    },
} , { timestamps: true })

const Task = mongoose.model('Task', taskSchema)
export default Task