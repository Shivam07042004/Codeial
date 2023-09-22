const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(request,response){
    Post.create({
        content:request.body.content,
        user:request.user._id
    })
    .then(() => {
        console.log('post is created')
        return response.redirect('back')
    })
    .catch((error) => {
        console.log('error in the creating the posts',error);
    })
}

module.exports.destroy = function(request,response){
    console.log('id need to be deleted ',request.params.id);
    Post.findById(request.params.id)
        .then((post) => {
            if(post){
                if(post.user == request.user.id){
                    Post.deleteOne({ _id: post._id })
                        .then(() => {
                            console.log('deleted');
                            // Deletion successful
                        })
                        .catch((error) => {
                            console.log('again error',error);
                            // Handle the error
                        });

                    Comment.deleteMany({post : request.params.id})
                            .then(() => {
                                console.log('comments of post are deleted');
                                console.log('post deleted');
                                return response.redirect('back');
                            })
                            .catch((error) => {
                                console.log('error in deleting the comments of the post');
                            })
                }
            }
            else  {
                console.log('you cannot delete this post');
                return response.redirect('back');
            }
        })
        .catch((error) => {
            console.log('error in the deleting the post');
        })
}