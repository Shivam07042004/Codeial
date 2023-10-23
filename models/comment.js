const mongoose= require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,

        ref:'Post'
    },
    likes : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like',
            require: true
        }
    ]
},{
    timestamps:true
})

const Comment = new mongoose.model('Comment',commentSchema);

module.exports = Comment;