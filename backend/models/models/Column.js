import mongoose from 'mongoose'

const columnSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    order : {
        type : Number,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
} , { timestamps: true })

const Column = mongoose.model('Column', columnSchema)
export default Column