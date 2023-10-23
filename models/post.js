const mongoose= require('mongoose');

const PostSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{  // this is used to find the user who is making these post or these posts belongs to whom
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // include the array of ids of all comments 
    comments:[{

        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }],
    likes : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like',
            require: true
        }
    ]
},{     timestamps:true // used to restore the updated time and created time in changes or posts
});

const Post = mongoose.model('post',PostSchema);

module.exports = Post;