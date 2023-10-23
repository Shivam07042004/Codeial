const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.toggleLike = async function(request,response){
    try{
        // likes/toggle/?id=abcdef&type=Post
        let likeable;
        let deleted = false;

        // query is for post like or comment like
        if(request.query.type == 'Post'){
            likeable = await Post.findById(request.query.id).populate('likes');
        }
        else {
            likeable = await Comment.findById(request.query.id).populate('likes');
        }

        // if like is already exists
        let existingLike = await Like.findOne({
            likeable: request.query.id,
            onModel : request.query.type,
            user : request.user._id
        })

        // if like is already exists delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            deleted = true;
        }
        // else create a new like 
        else {
            let newLike = await Like.create({
                user : request.user._id,
                likeable : request.query.id,
                onModel : request.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();
        }

        return response.json(200,{
            message: 'request successful!',
            data:{
                deleted : deleted
            }
        })

    }catch(error){
        if(error){
            console.log('error in liking ',error);
            return response.json(500,{
                message:'internal server error'
            })
        }
    }
}